import { FormEvent, useCallback, useState } from "react"
import { input, loginFallback, submitButton } from "@/components/LoginFallback/LoginFallback.css";

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
    return response.json();
  }

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const result = await upsertUser(email, username);
    console.log(result.message);
    sessionStorage.setItem("email", email);
    loginCallback();
  }, [email, username])
  
  return (
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
  )
}