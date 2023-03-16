import { prisma } from './db';

export async function getDevices() {
  return prisma.token.findMany({ include: { dispositivo: true } });
}

export async function getOneDeviceByNameAndUser(
  nome: string,
  usuario: string
) {
  return prisma.dispositivo.findFirst({
    where: { nome, usuario },
    include: { Token: true }
  });
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
  return prisma.dispositivo.findFirst({
    where: { id },
    include: { Token: true }
  });
}

export async function updateDevice(
  id: string,
  nome?: string,
  usuario?: string
) {
  try {
    return await prisma.dispositivo.update({
      where: { id },
      data: { nome, usuario }
    });
  } catch (error: any) {
    throw new Error('Update não realizado');
  }
}

export async function getOnlyIdDevice(id: string) {
  try {
    return await prisma.dispositivo.findFirst({ where: { id } });
  } catch (error) {
    throw new Error();
  }
}
