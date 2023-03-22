import { prisma } from './db';

export async function getUserToken(token: string) {
  return prisma.token.findFirst({
    where: { token },
    include: { dispositivo: true }
  });
}

export async function getOneTempoMonitorado(
  date: string,
  dispositivo_id: string,
  software: string
) {
  return prisma.tempoMonitorado.findFirst({
    where: { date, dispositivo_id, software }
  });
}

export async function updateOneTempoMonitorado(id: string) {
  return prisma.tempoMonitorado.update({
    where: { id },
    data: { tempo: { increment: 10 } }
  });
}

export async function createOneTempoMonitorado(
  date: string,
  software: string,
  dispositivo_id: string
) {
  return prisma.tempoMonitorado.create({
    data: { date, software, dispositivo_id, tempo: 10 }
  });
}
