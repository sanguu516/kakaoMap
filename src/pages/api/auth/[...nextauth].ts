import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
