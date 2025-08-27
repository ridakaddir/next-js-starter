import NextAuth from "next-auth"
import FusionAuthProvider from "next-auth/providers/fusionauth"

const fusionAuthIssuer = process.env.FUSIONAUTH_ISSUER || 'http://localhost:9011';
const fusionAuthClientId = process.env.FUSIONAUTH_CLIENT_ID || 'e9fdb985-9173-4e01-9d73-ac2d60d1dc8e';
const fusionAuthClientSecret = process.env.FUSIONAUTH_CLIENT_SECRET || 'super-secret-secret-that-should-be-regenerated-for-production';
const fusionAuthUrl = process.env.FUSIONAUTH_URL || 'http://localhost:9011';

const missingError = 'missing in environment variables.';
if (!fusionAuthIssuer) {
    throw Error('FUSIONAUTH_ISSUER' + missingError)
}
if (!fusionAuthClientId) {
    throw Error('FUSIONAUTH_CLIENT_ID' + missingError)
}
if (!fusionAuthClientSecret) {
    throw Error('FUSIONAUTH_CLIENT_SECRET' + missingError)
}
if (!fusionAuthUrl) {
    throw Error('FUSIONAUTH_URL' + missingError)
}


export const authOptions =
{
    debug: true,
    providers: [
        FusionAuthProvider({
            issuer: fusionAuthIssuer,
            clientId: fusionAuthClientId,
            clientSecret: fusionAuthClientSecret,
            userinfo: 'http://localhost:9011/oauth2/userinfo',
            token: 'http://localhost:9011/oauth2/token',
            authorization: {
                params: {
                    scope: 'openid offline_access email profile'
                }
            }
        }),
    ],
    // callbacks: {
    //     authorized: async ({ auth }: { auth: unknown }) => {
    //         return !!auth
    //     },
    // }
}

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions) 