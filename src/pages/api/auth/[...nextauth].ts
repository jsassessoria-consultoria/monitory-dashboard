import NextAuth, { NextAuthOptions } from 'next-auth';
import credentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { getUniqueUser } from 'src/lib/prisma/users';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt'
  },
  providers: [
    credentialsProvider({
      type: 'credentials',
      credentials: {},
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        const { email, senha } = credentials as {
          email: string;
          senha: string;
        };

        // logica do backend para encontrar o usuario
        try {
          const hasUser = await getUniqueUser(email);
          if (
            email == hasUser.email &&
            bcrypt.compareSync(senha, hasUser.senha)
          ) {
            return { id: hasUser.id, email: hasUser.email };
          } else {
            throw new Error('Email ou Senha incorretos');
          }
        } catch (error) {
          throw new Error('Email ou Senha incorretos');
        }
      }
    })
    // ...add more providers here
  ],
  pages: {
    signIn: 'auth/sigin'
  }
};
export default NextAuth(authOptions);
