import { prisma } from './db';

type UserData = {
  nome: string;
  email: string;
  password: string;
};

export async function getUniqueUser(email: string) {
  return prisma.usuarios_Web.findUnique({ where: { email } });
}

export async function getAllUser() {
  return prisma.usuarios_Web.findMany({});
}

export async function createUser(data: UserData) {
  return prisma.usuarios_Web.create({ data });
}
