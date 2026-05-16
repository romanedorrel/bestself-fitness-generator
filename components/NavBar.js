"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBar() {
  const path = usePathname();
  //returns navbar for navigating through the application
  return (
    <nav className="NavBar">
      <div className="nav-inner">
        <Link href="/dashboard" className="nav-brand">
          BestSelf
        </Link>

        <ul className="menu">
          <li>
            <Link
              href="/dashboard"
              className={path.startsWith("/dashboard") ? "active" : null}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/generate-workout"
              className={path.startsWith("/generate-workout") ? "active" : null}
            >
              Generate Workout
            </Link>
          </li>
          <li>
            <Link
              href="/workouts"
              className={path.startsWith("/workouts") ? "active" : null}
            >
              My Workouts
            </Link>
          </li>
          <li>
            <Link
              href="/meals"
              className={path.startsWith("/meals") ? "active" : null}
            >
              Meals
            </Link>
          </li>
        </ul>

        <button className="logout" onClick={() => signOut()}>
          Log out
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
