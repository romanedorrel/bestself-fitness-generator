export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/workouts/:path*",
    "/meals/:path*",
    "/dashboard/:path*",
    "/generate-workout/:path*",
  ],
};
