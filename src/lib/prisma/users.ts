import { prisma } from './db';

type UserData = {
  email: string;
  senha: string;
};

export async function getUniqueUser(email: string) {
  return prisma.usuario_Web.findFirstOrThrow({ where: { email } });
}

export async function getOneUser(email: string) {
  return prisma.usuario_Web.findFirst({ where: { email } });
}

export async function getAllUser() {
  return prisma.usuario_Web.findMany({});
}

export async function createUser(data: UserData) {
  return prisma.usuario_Web.create({ data });
}
