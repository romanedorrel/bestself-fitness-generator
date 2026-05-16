"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Grid } from "@mui/material";
import SavedWorkoutCard from "./SavedWorkoutCard";
import ActionCard from "./ActionCard";
import EmptyState from "./EmptyState";
import PageHeader from "./PageHeader";
import StatCard from "./StatCard";

const Dashboard = () => {
  const { data: session } = useSession();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch("/api/workouts");

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch workouts");
        }

        const data = await response.json();
        setWorkouts(data.workouts || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  const recentWorkouts = useMemo(() => {
    return [...workouts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [workouts]);

  const latestWorkout = recentWorkouts[0];

  return (
    <div className="dashboard-page">
      <PageHeader
        eyebrow="BestSelf"
        title={`Welcome ${session?.user?.email ?? "back"}. `}
        description="Choose what you want to build today."
        actions={
          <>
            <Link href="/generate-workout" className="button button-primary">
              Generate Workout
            </Link>
            <Link href="/workouts" className="button button-secondary">
              View Workouts
            </Link>
          </>
        }
      />

      <section className="action-grid" aria-label="Primary actions">
        <ActionCard
          href="/generate-workout"
          title="Generate Workout"
          description="Create a workout by focus area, workout count, and fitness level."
          action="Start"
        />
        <ActionCard
          href="/workouts"
          title="My Workouts"
          description="Review the workouts you have already saved."
          action="Open"
        />
        <ActionCard
          href="/meals"
          title="Generate Meal"
          description="Get a meal idea from an existing category."
          action="Generate"
        />
      </section>

      <Grid container spacing={2} className="stat-grid">
        <Grid item xs={12} sm={4}>
          <StatCard label="Saved workouts" value={workouts.length} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <StatCard
            label="Latest focus"
            value={latestWorkout?.focusArea || "None yet"}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <StatCard
            label="Latest level"
            value={latestWorkout?.intensityLevel || "None yet"}
          />
        </Grid>
      </Grid>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Recent Workouts</h2>
            <p>Your latest saved workout plans.</p>
          </div>
          <Link href="/workouts" className="text-link">
            View all
          </Link>
        </div>

        {loading && <p>Loading workouts...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && recentWorkouts.length === 0 && (
          <EmptyState
            title="No saved workouts yet"
            description="Generate a workout and save it to see it here."
            actionLabel="Generate Workout"
            href="/generate-workout"
          />
        )}

        <Grid container spacing={2}>
          {recentWorkouts.map((workout) => (
            <Grid item key={workout._id} xs={12} sm={6} md={4}>
              <Link href={`/workouts/${workout._id}`}>
                <SavedWorkoutCard
                  id={workout._id}
                  title={workout.workoutName}
                  focus={workout.focusArea}
                  intensityLevel={workout.intensityLevel}
                  exercises={workout.exercises}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </section>
    </div>
  );
};
export default Dashboard;
