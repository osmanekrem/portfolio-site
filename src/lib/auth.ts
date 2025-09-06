import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"
import * as schema from "@/db/schema"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
    emailAndPassword: {
        enabled: true,
    },
    advanced: {
        session: {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            updateAge: 60 * 60 * 24, // 24 hours
        },
        cookies: {
            sessionCookie: {
                name: "session",
                options: {
                    httpOnly: true,
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production",

                }
            }
        }
    },
    trustedOrigins: [
        process.env.NEXT_PUBLIC_BASE_URL!
    ],
    rateLimit: {
        window: 10,
        max: 100
    },
});