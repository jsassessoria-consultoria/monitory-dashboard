export function removeBearerTokenPrefix(token: string): string {
  return token.replace(/^Bearer\s+/, '');
}
