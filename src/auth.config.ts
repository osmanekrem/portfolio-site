import Credentials from "next-auth/providers/credentials"

import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas"
import { getUserByUsername } from "./data/user"

export default {
  providers: [Credentials({
    async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if(validatedFields.success) {
            const {username, password} = validatedFields.data;            

            const user = await getUserByUsername(username)
            
            if(!user || !user.password) return null
            
            const passwordsMatch = await bcrypt.compare(password,user.password)

            if(passwordsMatch) return user
        }

        return null
    }
  })],
} satisfies NextAuthConfig