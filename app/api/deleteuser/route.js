import { mongoData } from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(req){
    try{
         // Check if user is authenticated
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json({
                message: "You must be logged in to delete your account"
            }, {status: 401});
        }

        let body;
        try{
            body = await req.json();
        } catch (e) {
            return NextResponse.json({message: "Invalid JSON"}, {status: 400})    
        }
        const{ userEmail} = body;

        //Validate email
        if (!userEmail?.trim()) {
            return NextResponse.json({message: "Email is required"}, {status: 400})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            return NextResponse.json({message: "Invalid email format"}, {status: 400})
        }

        await mongoData();
        const normalizedEmail = userEmail.trim().toLowerCase();
        const existingUser = await User.findOne({userEmail: normalizedEmail})
        
        if(!existingUser){
            return NextResponse.json({message: "No user found with this email"}, {status: 404});
        }

        await User.deleteOne({userEmail: normalizedEmail});

        return NextResponse.json({ message: "User deleted successfully"}, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({message: "Failed to delete user. Please try again later."}, {status: 500})
    }
}