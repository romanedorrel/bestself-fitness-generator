import { mongoData } from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import  User from '../../../models/user.js';
import Workout from '../../../models/Workout.js';


export async function POST(req) {
    try {
        // // Check if user is authenticated
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: "User must be logged in to save workouts" }, { status: 401 });
        }
        let body;
        try {
            body = await req.json();
        } catch (e) {
            return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
        }
        const { workoutName, focusArea, intensityLevel, exercises } = body;

        await mongoData();
    
        const existingUser = await User.findById(session.user.id);
        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Validate workout data
        if (!workoutName?.trim() || !focusArea?.trim() || !intensityLevel?.trim() || !exercises) {
            return NextResponse.json({ message: "Workout name, focus area, intensity level, and exercises are required" }, { status: 400 });
        }

        if (!Array.isArray(exercises) || exercises.length === 0) {
            return NextResponse.json({ message: "At least one exercise is required" }, { status: 400 });
        }

        for (const exercise of exercises) {
            if (!exercise.id || !exercise.exerciseName?.trim() || exercise.instructions === undefined) {
                return NextResponse.json({ message: "Each exercise must have an ID, name, and instructions" }, { status: 400 });
            }
        }

        const newWorkout = new Workout({
            workoutName: workoutName.trim(),
            user: existingUser._id,
            focusArea: focusArea.trim(),
            intensityLevel: intensityLevel.trim(),
            exercises: exercises.map(ex => ({
                id: ex.id,
                exerciseName: ex.exerciseName.trim(),
                instructions: Array.isArray(ex.instructions) 
                ? ex.instructions.join(', ').trim()
                : ex.instructions || "",
            }))
        });

        await newWorkout.save();

        return NextResponse.json({ message: "Workout created successfully", workoutId: newWorkout._id }, { status: 201 });
        
    }catch (error) {
        console.error("Error creating workout:", error);
        return NextResponse.json({ message: "Failed to create workout. Please try again later." }, { status: 500 });
    }
}

export async function GET(req) {
try{
    const session = await getServerSession(authOptions);
    if (!session || !session.user){
        return NextResponse.json({ message: "User must be logged in to view workouts" }, { status: 401 });
    }
    await mongoData();
    const existingUser = await User.findById(session.user.id);
    if (!existingUser) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const workouts = await Workout.find({ user: session.user.id })
    return NextResponse.json({ workouts }, {status: 200});
    
}catch (error) {
    console.error("Error fetching workouts:", error);
    return NextResponse.json({ message: "Failed to fetch workouts. Please try again later." }, { status: 500 });
}
}