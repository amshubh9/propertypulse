import connectDB from '@/config/database';
import User from '@/models/User';
import { connect } from 'mongoose';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions={
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization:{
                params:{
                    prompt: "consent",
                    access_type: "offline",
                    response_type:"code"
                }
            }
        })
    ],
     callbacks:{
        //Invoked on successful signIn
        async signIn({profile}){
            // 1.connect to database
            await connectDB();
            // 2. check if user exists
            const userExists=await User.findOne({email:profile.email});
            // 3. if not,then add user to database
            if(!userExists){
                const username=profile.name.slice(0,20);

                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                });
                
            }
            // 4. Return true to allow sign in
            return true;
        },
        // Modifies the session object
        async session({session}){
           const user =await User.findOne({email : session.user.email});
           session.user.id=user._id.toString();
           return session;
        }
    }
}