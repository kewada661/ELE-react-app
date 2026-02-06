import { submitButton, input, errorMessage} from "@/components/LoginFallback/LoginFallback.css";
import { lock } from "@/components/Lock/Lock.css";
import { FormEvent, useState } from "react"

interface LockProps {
  unlock: () => void
}

export const Lock = ({ unlock }: LockProps) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === 'ode') {
      unlock();
    } else {
      document.getElementById("message")!.style.opacity = '1';
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={lock}>
        <p id="message" className={errorMessage}>The password you entered is incorrect</p>
        <input className={input}
          type="password"
          required
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          placeholder='Enter password'
        ></input>
        <button type='submit' className={submitButton}>Submit</button>
      </form>
    </>
  )
}