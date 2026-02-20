import { mongoData } from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

function validate(firstName, lastName, userEmail, userPassword){
    const errors = [];

    if(!firstName || !lastName || !userEmail || !userPassword){
        errors.push("All fields are required");
    }
    if(firstName.length < 2){
        errors.push("First name must be at least 2 characters long");
    }
    if(lastName.length < 2){
        errors.push("Last name must be at least 2 characters long");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(userEmail)){
        errors.push("Invalid email format");
    }
    if(userPassword.length < 6){
        errors.push("Password must be at least 6 characters long");
    }
    return errors;
}
export async function POST(req){
    try {
        let body;
        try {
            body = await req.json();
        } catch (e) {
            return NextResponse.json({message: "Invalid JSON"}, {status: 400})
        }
        const{ firstName, lastName, userEmail, userPassword} = body;
        
        const validationErrors = validate(firstName, lastName, userEmail, userPassword);
    
        if(validationErrors.length > 0){
            return NextResponse.json({message: "validation failed", errors: validationErrors}, {status: 400});
        }
        const securePassword = await bcrypt.hash(userPassword, 2)
    
        await mongoData();
        await User.create({firstName: firstName.trim(), lastName: lastName.trim(), userEmail: userEmail.trim().toLowerCase(), userPassword: securePassword})

        return NextResponse.json({message: "Successful SignUp"}, {status: 201});
    } catch (dbError) {
        if (dbError.code === 11000) {
            return NextResponse.json({ message: "Email already in use" }, { status: 409 });
        }
        console.error("Error during user signup:", dbError);
        return NextResponse.json({ message: "An error occurred during signup, failed to create account" }, { status: 500 });
    }

}