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
        const { workoutName, exercises } = body;

        await mongoData();
    
        const existingUser = await User.findById(session.user.id);
        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Validate workout data
        if (!workoutName?.trim() || !exercises) {
            return NextResponse.json({ message: "Workout name and exercises are required" }, { status: 400 });
        }

        if (!Array.isArray(exercises) || exercises.length === 0) {
            return NextResponse.json({ message: "At least one exercise is required" }, { status: 400 });
        }

        for (const exercise of exercises) {
            if (!exercise.id || !exercise.exerciseName?.trim() || !exercise.focusArea?.trim() || !exercise.intensityLevel?.trim() || exercise.instructions === undefined) {
                return NextResponse.json({ message: "Each exercise must have an ID, name, focus area, and intensity level" }, { status: 400 });
            }
        }

        const newWorkout = new Workout({
            workoutName: workoutName.trim(),
            user: existingUser._id,
            exercises: exercises.map(ex => ({
                id: ex.id,
                exerciseName: ex.exerciseName.trim(),
                focusArea: ex.focusArea.trim(),
                intensityLevel: ex.intensityLevel.trim(),
                instructions: ex.instructions?.trim() || "",
            }))
        });

        await newWorkout.save();

        return NextResponse.json({ message: "Workout created successfully", workoutId: newWorkout._id }, { status: 201 });
        
    }catch (error) {
        console.error("Error creating workout:", error);
        return NextResponse.json({ message: "Failed to create workout. Please try again later." }, { status: 500 });
    }
}