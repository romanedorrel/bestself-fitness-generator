import { mongoData } from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req){
    try{
        const{ newPassword, userEmail} = await req.json();
        
        await mongoData();
        const existingUser = await User.findOne({userEmail})

        if(!existingUser){
            return NextResponse.json({message: "No user found"}, {status: 404});
        }
        const securePassword = await bcrypt.hash(newPassword, 2)

        existingUser.userPassword = securePassword;

        await existingUser.save();
        return NextResponse.json({message: "Password Updated"}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "An error occured in updating password"}, {status: 500})
    }

}