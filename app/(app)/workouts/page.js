'use client'
import SavedWorkoutCard from '@/components/SavedWorkoutCard';
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

async function getSavedWorkout(){
    const res = await fetch('/api/workouts')
    if (!res.ok) {
        throw new Error("Failed to fetch saved workouts")
    }
    return res.json();
}
export default function Workouts() {
    const [savedWorkouts, setSavedWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadWorkouts(){
            try{
                const savedData = await getSavedWorkout();
                setSavedWorkouts(savedData.workouts);
            } catch (error){
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        loadWorkouts();
    }, []);
    if(loading) return <h2>Loading...</h2>;
    if(!savedWorkouts.length) return <h2>No saved workouts found.</h2>;
    
    return (
        <div>
            <header>
                <h1>My Workouts</h1>
            </header>

            <div className="workouts">
                <Grid container spacing={2}>
                    {   savedWorkouts.map((workout) => (
                            <Grid item key={[workout._id]} xs={12} sm={6}>
                                <SavedWorkoutCard
                                    id={workout._id}
                                    title={workout.workoutName}
                                    focus={workout.focusArea}
                                    intensityLevel={workout.intensityLevel}
                                    exercises={workout.exercises}/>
                            </Grid>
                        ))}
                </Grid>
            </div>
        </div>
    );
}