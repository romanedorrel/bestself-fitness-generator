import { mongoData } from "@/lib/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Workout from "../../../models/Workout.js";
import { NextResponse } from "next/server";
import User from "../../../models/user.js";


export async function GET(req, { params }) {
   const session = await getServerSession(authOptions);
   if(!session || !session.user) {
    return NextResponse.json({ message: "User must be logged in to view workouts" }, { status: 401 });
   }

   await mongoData();

    const existingUser = await User.findById(session.user.id);
    if (!existingUser) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const workout = await Workout.findById(params.id).where('user').equals(existingUser._id);
    if (!workout) {
        return NextResponse.json({ message: "Workout not found" }, { status: 404 });
    }

    return NextResponse.json({ workout });
}