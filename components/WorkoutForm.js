"use client";
import { useState } from "react";
import React from "react";
//accepts onFormSubmit prop from workoutlist to return selections
export default function Workouts({ onFormSubmit }) {
  //use state variables for capturing user selections
  const [filteredWorkout, setFilteredWorkout] = useState("");
  const [numberofWorkouts, setNumberOfWorkouts] = useState("5");
  const [fitnessLevel, setFitnessLevel] = useState("");

  //handle the form submit by returning the selections to workoutlist
  const handlesubmit = (e) => {
    e.preventDefault();
    onFormSubmit(filteredWorkout, numberofWorkouts, fitnessLevel);
  };
  //return radio form to the UI for user selections.
  return (
    <div>
      <h2>Please Select the muscle group you will be focusing on?</h2>
      <br />
      <form onSubmit={handlesubmit}>
        <input
          type="radio"
          id="abdominals"
          name="abdominals"
          value="abdominals"
          checked={filteredWorkout === "abdominals"}
          onChange={(e) => setFilteredWorkout(e.target.value)}
        />
        <label htmlFor="abs"> Abs </label>
        <input
          type="radio"
          id="Back"
          name="back"
          value="Back"
          checked={filteredWorkout === "Back"}
          onChange={(e) => setFilteredWorkout(e.target.value)}
        />
        <label htmlFor="Back"> Back/Bicep </label>
        <input
          type="radio"
          id="Chest"
          name="chest"
          value="Chest"
          checked={filteredWorkout === "Chest"}
          onChange={(e) => setFilteredWorkout(e.target.value)}
        />
        <label htmlFor="Chest"> Chest/Tricep </label>
        <input
          type="radio"
          id="Shoulders"
          name="shoulders"
          value="Shoulders"
          checked={filteredWorkout === "Shoulders"}
          onChange={(e) => setFilteredWorkout(e.target.value)}
        />
        <label htmlFor="Shoulders"> Shoulders/Traps </label>
        <input
          type="radio"
          id="Legs"
          name="legs"
          value="Legs"
          checked={filteredWorkout === "Legs"}
          onChange={(e) => setFilteredWorkout(e.target.value)}
        />
        <label htmlFor="Legs"> Legs/Glutes </label>
        <input
          type="radio"
          id="Stretching"
          name="stretching"
          value="Stretching"
          checked={filteredWorkout === "Stretching"}
          onChange={(e) => setFilteredWorkout(e.target.value)}
        />
        <label htmlFor="Stretching"> Stretch </label>
        <br />
        <br />
        <h2>How many workouts do you want to do?</h2>
        <br />
        <input
          type="range"
          name="workouts"
          id="workouts"
          value={numberofWorkouts}
          min="0"
          max="10"
          onChange={(e) => setNumberOfWorkouts(e.target.value)}
        />
        <label htmlFor="workouts">Select between 1 and 10</label> <br />
        <br />
        <h2>What is your Current fitness level?</h2>
        <br />
        <select
          name="dropdown"
          id="dropdown"
          onChange={(e) => setFitnessLevel(e.target.value)}
        >
          <option value="beginner">Default</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Advanced</option>
        </select>
        <br />
        <button className="button">Submit</button>
      </form>
    </div>
  );
}
