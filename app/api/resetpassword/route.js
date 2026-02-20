import { mongoData } from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req){
    try{
        let body;
        try {
            body = await req.json();
        } catch (e) {
            return NextResponse.json({message: "Invalid JSON"}, {status: 400});
        }
        
        const { newPassword, userEmail } = body;
        
        // Validate
        if (!userEmail?.trim()) {
            return NextResponse.json({message: "Email is required"}, {status: 400});
        }
        if (!newPassword) {
            return NextResponse.json({message: "New password is required"}, {status: 400});
        }
        if (newPassword.length < 6) {
            return NextResponse.json({message: "Password must be at least 6 characters"}, {status: 400});
        }
        
        const normalizedEmail = userEmail.trim().toLowerCase();
        
        await mongoData();
        const existingUser = await User.findOne({userEmail: normalizedEmail});

        if (!existingUser){
            return NextResponse.json({message: "No account found"}, {status: 404});
        }
        
        const securePassword = await bcrypt.hash(newPassword, 10); // Use 10 rounds, not 2
        existingUser.userPassword = securePassword;

        await existingUser.save();
        return NextResponse.json({message: "Password updated successfully"}, {status: 200});
    } catch (error) {
        console.error("Password reset error:", error);
        return NextResponse.json({message: "Failed to update password"}, {status: 500});
    }
}