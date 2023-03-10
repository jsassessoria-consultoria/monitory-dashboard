import { getOneUser } from 'src/lib/prisma/users';

export async function verifyAlreadyHasUser(email: string) {
  const hasUser = await getOneUser(email);
  return hasUser;
}
