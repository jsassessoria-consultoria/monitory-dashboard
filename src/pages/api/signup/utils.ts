import { getOneUser } from '../db/users';

export async function verifyAlreadyHasUser(email: string) {
  const hasUser = await getOneUser(email);
  return hasUser;
}
