import { FormEvent, useCallback, useState } from "react"
import { input, loginFallback, submitButton, errorMessage } from "@/components/LoginFallback/LoginFallback.css";

interface LoginFallbackProps {
  loginCallback: () => void;
}
export const LoginFallback = ({ loginCallback }: LoginFallbackProps) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const upsertUser = async (email: string, username: string) => {
    const response = await fetch('/api/db/users/fallback',{
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: username
      })
    });
    if (!response.ok) {console.log(response)};
    if (response.status === 401) {
      throw new Error("Invalid Username");
    }
    return response.json();
  }

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await upsertUser(email, username);
      sessionStorage.setItem("email", email);
      loginCallback();
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "Invalid Username") {
        console.log("Invalid Username");
        document.getElementById("errorMessage")!.style.opacity = '1';
      }
    }
  }, [email, username])
  
  return (
    <>
      <p className={errorMessage} id="errorMessage">That username is not available... please try another</p>
      <form onSubmit={handleSubmit} className={loginFallback}>
        <input className={input}
          required
          type="email" 
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          placeholder='Enter Email...'
        ></input>
        <input className={input}
          required
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
          placeholder='Enter Username...'
        ></input>
        <button type='submit' className={submitButton}>Submit</button>
      </form>
    </>
  )
}