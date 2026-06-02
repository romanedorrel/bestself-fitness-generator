import Link from "next/link";
import styles from "./page.module.css";

export default function LandingPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <h2 className={styles.logo}>BestSelf</h2>

        <div className={styles.navLinks}>
          <Link href="/login">Log In</Link>
          <Link href="/signup" className={styles.navButton}>
            Get Started
          </Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <p className={styles.badge}>Fitness planning made simple</p>

        <h1>Build smarter workouts and meal ideas with BestSelf.</h1>

        <p className={styles.heroText}>
          Generate structured workouts, save your favorite plans, and explore
          meal ideas based on your goals.
        </p>

        <div className={styles.heroActions}>
          <Link href="/signup" className={styles.primaryButton}>
            Get Started
          </Link>
          <Link href="/login" className={styles.secondaryButton}>
            Log In
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.card}>
          <h3>Generate Workouts</h3>
          <p>
            Create workouts by focus area, workout count, and current fitness
            level.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Save Your Plans</h3>
          <p>
            Keep track of workouts you have already generated and return to them
            anytime.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Explore Meals</h3>
          <p>
            Generate simple meal ideas from categories like breakfast, chicken,
            seafood, vegan, and more.
          </p>
        </div>
      </section>

      <section className={styles.preview}>
        <div>
          <p className={styles.sectionLabel}>App Preview</p>
          <h2>Your fitness plan in one clean dashboard.</h2>
          <p>
            BestSelf gives you a focused space to generate, review, and build
            around your workouts without unnecessary clutter.
          </p>
        </div>

        <div className={styles.previewGrid}>
          <div className={styles.statCard}>
            <span>Latest focus</span>
            <h3>Shoulders</h3>
          </div>

          <div className={styles.statCard}>
            <span>Latest level</span>
            <h3>Beginner</h3>
          </div>

          <div className={styles.statCardWide}>
            <span>Recent Workout</span>
            <h3>Workout: Shoulders</h3>
            <p>Exercises: 5</p>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Start building your next plan today.</h2>
        <Link href="/signup" className={styles.primaryButton}>
          Create Account
        </Link>
      </section>
    </main>
  );
}
