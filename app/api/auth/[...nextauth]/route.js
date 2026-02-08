
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToStaffDB } from "@/db/database";
import { User } from "@/models/models";



export const authOptions = {
    
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {}, //leave blank if using custom login page, otherwise form will be generated with provided values

            async authorize(credentials) {
                // const user = {id: "1"}
                const {email, password} = credentials;

                try {
                    await connectToStaffDB();
                    const user = await User.findOne({email})

                    if(!user) {
                        return null;
                    }

                    if(password !== user.password) {
                        return null;
                    }

                    return user;

                } catch (error) {
                    console.log("Error", error)
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    }
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

