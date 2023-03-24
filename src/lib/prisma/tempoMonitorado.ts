import { prisma } from './db';

export async function getTempoMonitorado(dispositivo_id: string) {
  return prisma.tempoMonitorado.findMany({
    where: { dispositivo_id }
  });
}
