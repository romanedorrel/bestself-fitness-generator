'use client'
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignUpForm() {
    // input state values always need to be strings - empty initially
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reloading on form submit

        // add some password validation
        if(!firstName || !lastName || !userEmail || !userPassword ) {
            setError("All fields are required");
            return;
        }
        try {//fectches signup from api signup route to then post to the body
          const res =  await fetch ('api/signup',{
                method: "POST",
                headers:{"Content-type": "application/json"},
                body: JSON.stringify({
                    firstName, lastName, userEmail, userPassword
                })
            })
            //if fetch and post is succesful form resets and routes user to login page
            if(res.ok){
                const form = e.target;
                form.reset();
                router.push('/')
            }else{
                console.log("Signup failed.")
            }
        } catch (error) {
            console.log("Error during signup:", error);
        };

    }
    //Return Sign up form for creating a user
    return (
    <div className="login">
        <div><Image src='/project.png' width={250} height={250} className="mainLogo"alt='Logo'/></div>
        <div>
            <form onSubmit={handleSubmit} className="input">
            <label htmlFor="firstName">First Name:</label> <br />
                <input  
                    className="input"
                    type="text" 
                    value= {firstName}
                    id="firstName"
                    name="firstName"
                    placeholder="First Name" 
                    onChange={(e) => setFirstName(e.target.value)} /> <br />

            <label htmlFor="userEmail">Last Name:</label> <br />
                <input  
                    className="input"
                    type="text" 
                    value={lastName}
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name" 
                    onChange={(e) => setLastName(e.target.value)}/> <br />
                <label htmlFor="userEmail">Email Address:</label> <br />
                    <input 
                        className="input"
                        type="email" 
                        value={userEmail}
                        id= "userEmail" 
                        name="userEmail"
                        placeholder="Email"
                        onChange={(e) => setUserEmail(e.target.value)} /> <br />
                <label htmlFor="userPassword">Password:</label> <br /> 
                    <input 
                        className="input"
                        type="password" 
                        value={userPassword}
                        id="userPassword" 
                        name="userPassword"
                        placeholder="Password"
                        onChange={(e) => setUserPassword(e.target.value)} /> 
           
                <button className="button">Sign Up</button> <br />
                { error && (
                <div className="error">{error}</div>
                )
                }
                <Link className="signup"href={'/'}>Already have an account? <span style={{textDecoration:'underline'}}>Login</span></Link>
            </form>
        </div>
    </div>
    )
    }
    
    export default SignUpForm;