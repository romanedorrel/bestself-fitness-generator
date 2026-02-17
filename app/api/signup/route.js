import { mongoData } from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
export async function POST(req){
    try{
        const{ firstName, lastName, userEmail, userPassword} = await req.json();
        const securePassword = await bcrypt.hash(userPassword, 2)

        await mongoData();
        await User.create({firstName, lastName, userEmail, userPassword: securePassword})

        return NextResponse.json({message: "Successful SignUp"}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "An error occured in signup"}, {status: 500})
    }

}