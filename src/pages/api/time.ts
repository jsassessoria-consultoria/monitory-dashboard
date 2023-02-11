import prisma from '@db';
import { PrismaClient, Time_Monitored } from '@prisma/client';
import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const RegisterTimeSchema = z.object({
  name: z.string()
});

class RegisterTimeService {
  constructor(private repository: RegisterTimeRepository) {}

  async createRegister(name: string) {
    const software = await this.repository.findByName(name);
    const pollingInterval = 5;

    if (!software) {
      throw new Error('Software not found!', {
        cause: {
          statusCode: 404
        }
      });
    }

    const register = await this.repository.findBySoftwareId(
      software.id
    );

    if (register) {
      const alreadyRegisteredToday = dayjs(
        register.createdAt
      ).isSame(dayjs(), 'day');

      if (alreadyRegisteredToday) {
        return this.updateRegister(
          register.id,
          register?.accumulated_time + pollingInterval
        );
      }
    }

    return this.repository.create({
      software_id: software.id,
      accumulated_time: pollingInterval
    });
  }

  private async updateRegister(
    id: string,
    accumulated_time: number
  ) {
    const register = await this.repository.updateRegister(
      id,
      accumulated_time
    );

    return register;
  }
}

class RegisterTimeRepository {
  constructor(private db: PrismaClient) {}

  async create(
    data: Pick<Time_Monitored, 'software_id' | 'accumulated_time'>
  ) {
    return this.db.time_Monitored.create({
      data: {
        software_id: data.software_id,
        accumulated_time: data.accumulated_time
      }
    });
  }

  async findByName(name: string) {
    const software = await this.db.softwares.findFirst({
      where: {
        name
      }
    });

    return software;
  }

  async findBySoftwareId(id: string) {
    return this.db.time_Monitored.findFirst({
      where: {
        software_id: id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async updateRegister(id: string, accumulated_time: number) {
    return this.db.time_Monitored.update({
      where: {
        id
      },
      data: {
        accumulated_time
      }
    });
  }
}

export default async function RegisterTime(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      try {
        const { name } = RegisterTimeSchema.parse(req.body);

        const registerService = new RegisterTimeService(
          new RegisterTimeRepository(prisma)
        );

        await registerService.createRegister(name);

        return res.status(201).end();
      } catch (error: any) {
        return res.status(400).end(error.message);
      }

    default:
      res.status(405).end();
  }
}
