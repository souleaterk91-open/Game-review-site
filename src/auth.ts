import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google],
    session: {
        strategy: "database",
    },
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                // @ts-ignore - To be fixed via next-auth extension
                session.user.role = user.role;
            }
            return session;
        }
    }
})
