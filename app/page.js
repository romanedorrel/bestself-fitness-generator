'use client'

import LoginForm from "@/components/LoginForm";
import Background from "@/components/Background";


export default function Home() {
  
  return (
    // <main className={styles.main}>
      <main className="auth-page">
       <Background/> 
      <LoginForm/>
      </main>
    // </main>
  );
}
