import { v4, validate } from 'uuid';

export function generateToken(): string {
  return v4();
}

export function validateToken(token: any): boolean {
  return validate(token);
}
