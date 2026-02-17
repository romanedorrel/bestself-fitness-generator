'use client'

import LoginForm from "@/components/LoginForm";
import FormsBackground from "@/components/FormsBackground";


export default function Home() {
  
  return (
    // <main className={styles.main}>
      <div className="bg-parent">
       <FormsBackground/> 
      <LoginForm/>
</div>
    // </main>
  );
}
