import { mongoData } from "@/lib/dbConnect";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

const authOptions = {
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
                    return activeUser;
                } catch (error) {
                    console.log('failed login attempt')
                }
            }
        })
    ],
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