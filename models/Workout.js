import mongoose from "mongoose";
import { Schema } from "mongoose";

const workoutSchema = new Schema({
    workoutName: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    focusArea: { type: String, required: true },
    intensityLevel: { type: String, required: true },
            exercises: [
        {
            id: { type: String, required: true },
            exerciseName: { type: String, required: true }, 
            instructions: { type: String, required: false },
        },
    ],
}, { timestamps: true });

const Workout = mongoose.models.Workout || mongoose.model("Workout", workoutSchema);

export default Workout;         

