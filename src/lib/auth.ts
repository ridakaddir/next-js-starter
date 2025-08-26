import NextAuth from "next-auth"
import FusionAuth from "next-auth/providers/fusionauth"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        FusionAuth
    ],
})