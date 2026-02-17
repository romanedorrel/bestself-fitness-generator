import { mongoData } from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const{ userEmail} = await req.json();
        

        await mongoData();
        const existingUser = await User.findOne({userEmail})
        
        if(!existingUser){
            return NextResponse.json({message: "No user found"}, {status: 404});
        }
        await User.deleteOne({userEmail});
        return NextResponse.json({ message: "User deleted", user: existingUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({message: "Error deleting user", error: error.message}, {status: 500})
    }

}