import { prisma } from './db';

export async function getDevices() {
  return prisma.dispositivo.findMany({});
}

export async function getOneDevice(nome: string) {
  try {
    return await prisma.dispositivo.findFirst({ where: { nome } });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createDevice(data: any, uuid: any) {
  try {
    return await prisma.$transaction(async tx => {
      const device = await tx.dispositivo.create({ data });
      await tx.token.create({
        data: { dispositivo_id: device.id, token: uuid }
      });
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteDevice(id?: string) {
  try {
    return await prisma.token.delete({ where: { id } });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getIdDevice(id: string) {
  try {
    return await prisma.dispositivo.findFirst({
      where: { id },
      include: { Token: true }
    });
  } catch (error: any) {
    throw new Error('Usuário não encontrado');
  }
}
