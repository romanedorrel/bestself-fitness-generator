import { mongoData } from "@/lib/dbConnect";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

export const authOptions = {
    providers:[
        CredentialsProvider ({
            name: 'credentials',
            credentials:{},
            async authorize(credentials) {
                const {userEmail, userPassword} = credentials;
                try {
                    await mongoData();
                    const activeUser = await User.findOne({userEmail})
                    if (!activeUser){
                        return null;
                    }

                    const validPassword = await bcrypt.compare(userPassword, activeUser.userPassword)

                    if (!validPassword){
                        return null;
                    }
                    return {
                        id: activeUser._id.toString(),
                        email: activeUser.userEmail
                    };
                } catch (error) {
                    console.log('failed login attempt')
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id?.toString() || user.id;
                token.email = user.userEmail;
            }
        return token;
        },
        
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.email = token.email;
            }
        return session;
        },
    },

    session: {
        strategy: "jwt",
    },

    secret:process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    },
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};