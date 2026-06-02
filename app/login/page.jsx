"use client";

import LoginForm from "@/components/LoginForm";
import Background from "@/components/Background";

export default function Login() {
  return (
    <main className="auth-page">
      <Background />
      <LoginForm />
    </main>
  );
}
