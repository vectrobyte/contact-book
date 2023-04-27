import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { type GetServerSidePropsContext } from 'next';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import * as process from 'process';

import { env } from '@/env.mjs';
import { prisma } from '@/server/db';

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      idToken: true,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        accessToken: token?.accessToken,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = account.id;
      }
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
