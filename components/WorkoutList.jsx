'use client'
import { useState, useEffect } from "react";
import React from "react";
import WorkoutCard from "./WorkoutCard";
import { Grid } from "@mui/material";
import Workouts from "./WorkoutForm";

//async function for fetching workout dataset and saving in res
async function getWorkoutsData() {
    const res = await fetch('https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json');
    if (!res.ok) { // Recommendation: handle errors
    throw new Error("Failed to fetch workouts")
    }
    return res.json()
    }
//default function for list of all workouts
export default function WorkoutList() {
    const [workouts, setWorkouts] = useState([]);
    const [filteredWorkout,setFilteredWorkout] = useState([]);
    const backBicep = ['lats', 'middle back', 'lower back', 'biceps'];
    const chestTricep = ['chest','triceps'];
    const legsGlutes = ['glutes','hamstrings','quadriceps','abductors','adductors'];
    const shouldersTraps = ['shoulders','traps'];

    //useEffect Hook for fetching workouts from the promise and loading them in the workouts array
    useEffect(() => {
        async function fetchWorkouts() {
            try {
                const workoutsData = await getWorkoutsData(); // default limit is 5
                setWorkouts(workoutsData);
            } catch (error) {
                console.error(error);
            }
        }
        //call to fetchWorkout to trigger its action
        fetchWorkouts();
    }, []);
    //Handle the submit of the workoutform component passed back via parameters
    const handleFormSubmit = (selectedWorkout,numberofWorkouts,fitnessLevel) => {
        // declaring for for use inside and outside of if statements
        let filteredList;
        let displayList;
        //captures user selections that has multiple muscle groups, and filter by an array including all related muscles
        if(selectedWorkout === 'back'){
            filteredList = workouts.filter(workout => workout.primaryMuscles.some(muscle => backBicep.includes(muscle)));
        }else if(selectedWorkout === 'legs'){
            filteredList = workouts.filter(workout => workout.primaryMuscles.some(muscle => legsGlutes.includes(muscle)));
        }else if(selectedWorkout === 'chest'){
            filteredList = workouts.filter(workout => workout.primaryMuscles.some(muscle => chestTricep.includes(muscle)));
        }else if(selectedWorkout === 'shoulders'){
            filteredList = workouts.filter(workout => workout.primaryMuscles.some(muscle => shouldersTraps.includes(muscle)));
            //filter array by category as stretching is stored in a category and not a muscle group.
        }else if(selectedWorkout === 'stretching'){
            filteredList = workouts.filter(workout => workout.category.includes(selectedWorkout));
            //filter directly based on user selection
        }else{
        filteredList = workouts.filter(workout => workout.primaryMuscles.includes(selectedWorkout));
        }
        //filter the results of completed filter to then display desired fitness level
        displayList = filteredList.filter(result => result.level.includes(fitnessLevel));
        //for loop for randomizing the return array
        for (let i = displayList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [displayList[i], displayList[j]] = [displayList[j], displayList[i]];
        }
        //limit the array to the desired amount of workouts passed from client through workout form component
        let limitedResults = displayList.slice(0,numberofWorkouts);
        //load filtered array to filtered workouts
        setFilteredWorkout(limitedResults);
    }
    

return (
    <div>
        {/* passes the onformSubmit to workout forms component to recieve user selections for submitting form */}
        <div className="forms">
            <Workouts onFormSubmit={handleFormSubmit} />
        </div>
        {/* A grid container wrapping a map of all filtered workouts which are then passed to workoutcard for card styling */}
        <div className="workouts">  
            <Grid container spacing={2}>        
                {filteredWorkout.map(workout => (
                    <Grid item key={[workout.id]} xs={12} sm={6}>
                        <WorkoutCard
                            id={workout.id}
                            title={workout.name}
                            subtitle={workout.level}
                            description={workout.instructions}/>
                    </Grid>
                    ))}
            </Grid>
        </div>
    </div>
)
}
