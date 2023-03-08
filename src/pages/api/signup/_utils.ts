import { getOneUser } from '../db/users';

export async function verifyAlreadyHasUser(email: string) {
  const hasUser = await getOneUser(email);
  return hasUser;
}

//TODO: validar email com uma lib ou algo melhor
export function validateEmail(email: string) {
  const isValid = email.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  return isValid;
}

export function validatePassword(senha: string) {
  if (senha.length < 8) return null;
  return true;
}
