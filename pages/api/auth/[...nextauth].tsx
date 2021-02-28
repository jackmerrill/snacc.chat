import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { PrismaClient } from '@prisma/client';
// import Adapters from 'next-auth/adapters';

import Adapter from '../../../lib/Adapter';

const prisma = new PrismaClient();

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> => NextAuth(req, res, {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  
  adapter: Adapter.Adapter({ prisma }),

  callbacks: {
    async session(session, user) {
        session.user.snowflake = user.snowflake
        return session
    },
  }
});
