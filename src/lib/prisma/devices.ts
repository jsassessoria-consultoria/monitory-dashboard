import { prisma } from './db';

export async function getDevices() {
  return prisma.usuario.findMany({});
}
