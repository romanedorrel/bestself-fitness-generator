import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";


function ResetPassword() {
    
    const router = useRouter();
    const [newPassword, setNewPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [error, setError]= useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reloading on form submit
        setError(''); 
        try {//fetch resetpassword route from api to update user password
            const res =  await fetch ('api/resetpassword',{
                  method: "POST",
                  headers:{"Content-type": "application/json"},
                  body: JSON.stringify({
                       newPassword, userEmail
                  })
              })//reset form and routes to login if fetch and update successful
              if(res.ok){
                  const form = e.target;
                  form.reset();
                  router.push('/')
              }else{
                const data = await res.json();
                setError(data.message || 'No user found.');
              }
          } catch (error) {
              console.log("Error changing password:", error);
              setError('Unexpected error');
          };
  
      
        // add some password validation
        // if (userPassword.length < 5) {
        //     setError('Password must be at least 5 characters long');
        // } else if (userPassword === userEmail) {
        //     setError('Password must not match email address');
        // }
    }
    //return form for resetting user password
    return (
    <div className="login">
        <div><Image src='/project.png' width={250} height={250} className="mainLogo"alt='Logo'/></div>
        <div>
            <form onSubmit={handleSubmit}>
            <label htmlFor="userEmail">Email:</label> <br /> 
               <div> 
                    <input 
                        className="input"
                        type="email" 
                        value={userEmail}
                        id= "userEmail" 
                        name="userEmail"
                        placeholder="Email"
                        onChange={(e) => setUserEmail(e.target.value)} /> <br />
                </div>        
                <label htmlFor="newPassword">New Password:</label> <br /> 
               <div> 
                    <input 
                        className="input"
                        type="password" 
                        value={newPassword}
                        id= "newPassword" 
                        name="newPassword"
                        placeholder="Password"
                        onChange={(e) => setNewPassword(e.target.value)} /> <br />
                </div>        
                <button className="button">Reset Password</button> <br /><br />
                { error && (
                <div className="error">{error}</div>
                )}
                <Link className="signup"href={'/'}>Remember Password? <span style={{textDecoration:'underline'}}>Log in</span></Link>
            </form>
        </div>
    </div>
    )
    }
    
    export default ResetPassword

