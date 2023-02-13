import NextAuth, { NextAuthOptions } from 'next-auth';
import credentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt'
  },
  providers: [
    credentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize(credentials, req) {
        const { email, senha } = credentials as {
          email: string;
          senha: string;
        };

        // logica do backend para encontrar o usuario aqui por enquanto vou colocar email e senha estaticos aqui
        if (email !== 'teste@gmail.com' || senha !== '12345678') {
          throw new Error('email ou senha incorretos!! ');
        }
        return { id: '1234', email: 'teste@gmail.com' };
      }
    })
    // ...add more providers here
  ],
  pages: {
    signIn: 'auth/sigin'
  }
};
export default NextAuth(authOptions);
