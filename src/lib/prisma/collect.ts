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

export async function updateLocation(id: string, geolocation: any) {
  return prisma.dispositivo.update({
    where: { id },
    data: {
      isAccuracy: geolocation.isAccuracy,
      lat: geolocation.lat,
      long: geolocation.long
    }
  });
}

export async function backupUpdateOneTempoMonitorado(
  id: string,
  tempoSomado: number
) {
  return prisma.tempoMonitorado.update({
    where: { id },
    data: { tempo: { increment: tempoSomado } }
  });
}

export async function backupCreateOneTempoMonitorado(
  date: string,
  software: string,
  dispositivo_id: string,
  tempo: number
) {
  return prisma.tempoMonitorado.create({
    data: { date, software, dispositivo_id, tempo }
  });
}

export async function createOneTempoMonitorado(
  date: string,
  software: string,
  dispositivo_id: string
) {
  try {
    return await prisma.tempoMonitorado.create({
      data: { date, software, dispositivo_id, tempo: 10 }
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

/* export async function createOneTempoMonitorado(
  date: string,
  software: string,
  dispositivo_id: string
) {
  return prisma.tempoMonitorado.create({
    data: { date, software, dispositivo_id, tempo: 10 }
  });
} */

/* export async function createOneTempoMonitoradoAndLocation(
  date: string,
  software: string,
  dispositivo_id: string,
  lat: string | null = null,
  long: string | null = null,
  isAccuracy: boolean | null = null
) {
  try {
    return await prisma.$transaction(async tx => {
      await tx.tempoMonitorado.create({
        data: { date, software, dispositivo_id, tempo: 10 }
      });
      await tx.localizacao.create({
        data: { lat, long, isAccuracy, dispositivo_id }
      });
    });
  } catch (error: any) {
    throw new Error(error);
  }
} */
