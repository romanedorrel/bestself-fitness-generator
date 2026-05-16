import WorkoutCard from "@/components/WorkoutCard";
import Workout from "@/models/Workout";
import { mongoData } from "@/lib/dbConnect";
import { Grid } from "@mui/material";

async function getSavedWorkout(id) {
  await mongoData();

  const workout = await Workout.findById(id);
  if (!workout) {
    return null;
  }

  return JSON.parse(JSON.stringify(workout));
}

export default async function WorkoutDetail({ params }) {
  const { id } = await params;
  const workout = await getSavedWorkout(id);

  if (!workout) {
    return <h2>Workout not found.</h2>;
  }
  return (
    <div>
      <h1>{workout.workoutName}</h1> <br />
      {/* <p>Focus Area: {workout.focusArea}</p> */}
      {/* <p>Intensity Level: {workout.intensityLevel}</p> */}
      <h3>Exercises:</h3>
      <Grid container spacing={2}>
        {workout.exercises.map((exercise, index) => (
          <Grid item key={exercise.id || index} xs={12} sm={6}>
            <WorkoutCard
              id={exercise.id}
              title={exercise.exerciseName}
              subtitle={workout.intensityLevel}
              description={exercise.instructions}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
