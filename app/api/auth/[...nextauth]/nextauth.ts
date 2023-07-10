import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google';



export default NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token }) {
        token.userRole = "user"
        return token
      },
    },
  })