import { prisma } from './db';

type UserData = {
  nome: string;
  email: string;
  password: string;
};

export async function getUniqueUser(email: string) {
  return prisma.usuario.findFirstOrThrow({ where: { email } });
}

export async function getAllUser() {
  return prisma.usuario.findMany({});
}

export async function createUser(data: UserData) {
  return prisma.usuario.create({ data });
}
