import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";


function DeleteUser() {
    
    const router = useRouter();
    const [userEmail, setUserEmail] = useState('');
    const [error, setError]= useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reloading on form submit
        try {//awaits route from deleteuser api route then deletes user passes on based useremail
            const res =  await fetch ('api/deleteuser',{
                  method: "POST",
                  headers:{"Content-type": "application/json"},
                  body: JSON.stringify({
                       userEmail
                  })
              })//returns user to signup page after deleting account
              if(res.ok){
                  const form = e.target;
                  form.reset();
                  router.push('/signup')
              }else{
                const data = await res.json();
                setError(data.message || 'No user found.');
              }
          } catch (error) {
              console.log("Error deleting account:", error);
              setError("Unexpected Error");
          };
  
      }
  //form for deleting a user account
    return (
    <div className="login">
        <div><Image src='/project.png' width={250} height={250} className="mainLogo"alt='Logo'/></div>
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userEmail">Email Address:</label> <br /> 
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
                <button className="button">Delete Account</button> <br /><br />
                { error && (
                <div className="error">{error}</div>
                )}
            </form>
        </div>
    </div>
    )
    }
    
    export default DeleteUser

