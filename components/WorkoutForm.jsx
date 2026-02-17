'use client'
import { useState } from "react"
import React from "react";
//accepts onFormSubmit prop from workoutlist to return selections
export default function Workouts({onFormSubmit}) {
    //use state variables for capturing user selections
    const [filteredWorkout,setFilteredWorkout] = useState('');
    const [numberofWorkouts,setNumberOfWorkouts] = useState('5');
    const [fitnessLevel, setFitnessLevel] = useState('');

    //handle the form submit by returning the selections to workoutlist
    const handlesubmit = (e) => {
        e.preventDefault();
        onFormSubmit(filteredWorkout,numberofWorkouts, fitnessLevel)
    }
    //return radio form to the UI for user selections.
    return (
        <div>
            <h2>Please Select the muscle group you will be focusing on?</h2><br />
            <form onSubmit={handlesubmit}>
                <input 
                    type="radio" 
                    id="abdominals" 
                    name="abdominals" 
                    value='abdominals' 
                    checked={filteredWorkout === 'abdominals'}
                    onChange={(e) => setFilteredWorkout(e.target.value)} />
                <label htmlFor="abs"> Abs </label>
                <input 
                    type="radio" 
                    id="back" 
                    name="back" 
                    value='back' 
                    checked={filteredWorkout === 'back'}
                    onChange={(e) => setFilteredWorkout(e.target.value)} />
                <label htmlFor="back"> Back/Bicep </label>
                <input 
                    type="radio" 
                    id="chest" 
                    name="chest" 
                    value='chest' 
                    checked={filteredWorkout === 'chest'} 
                    onChange={(e) => setFilteredWorkout(e.target.value)}/>
                <label htmlFor="chest"> Chest/Tricep </label>
                <input 
                    type="radio" 
                    id="shoulders" 
                    name="shoulders" 
                    value='shoulders' 
                    checked={filteredWorkout === 'shoulders'} 
                    onChange={(e) => setFilteredWorkout(e.target.value)}/> 
                <label htmlFor="shoulders"> Shoulders/Traps </label>
                <input 
                    type="radio" 
                    id="legs" 
                    name="legs" 
                    value='legs' 
                    checked={filteredWorkout === 'legs'} 
                    onChange={(e) => setFilteredWorkout(e.target.value)}/> 
                    <label htmlFor="legs"> Legs/Glutes </label>
                <input 
                    type="radio" 
                    id="stretching" 
                    name="stretching" 
                    value='stretching' 
                    checked={filteredWorkout === 'stretching'}
                    onChange={(e) => setFilteredWorkout(e.target.value)} />
                <label htmlFor="stretching"> Stretch </label>

                <h2>How many workouts do you want to do?</h2><br />
                <input 
                    type="range" 
                    name="workouts" 
                    id="workouts" 
                    value={numberofWorkouts} 
                    min="0" 
                    max="10"
                    onChange={(e) => setNumberOfWorkouts(e.target.value)}/>
                <label htmlFor="workouts">Select between 1 and 10</label> <br /><br />

                <h2>What is your Current fitness level?</h2><br />
                <select name="dropdown" id="dropdown" onChange={(e)=> setFitnessLevel(e.target.value)}>
                    <option value="beginner">Default</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Advanced</option>
                </select><br />
                <button className="button">Submit</button>
            </form>  
        </div>
    )
}