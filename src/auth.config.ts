import {DefaultSession, NextAuthConfig} from "next-auth";
import {db} from "@/db/drizzle";
import {Role, users} from "@/db/schema";
import {eq} from "drizzle-orm";

export type ExtendedUser = {
    role?: Role
} & DefaultSession["user"];

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}

export const authConfig= {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token }) {
            if (!token.sub) return token

            const existingUser = (await db.select().from(users).where(eq(users.id, token.sub)).limit(1))?.[0];

            if(!existingUser) return token;

            token.role = existingUser.role;

            return token;
        },
        async session({ session, token }) {
            if (token.sub && session.user){
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as Role
            }

            return session;
        },
    },
    providers: []
} satisfies NextAuthConfig