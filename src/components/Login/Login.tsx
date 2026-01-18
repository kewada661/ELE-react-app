import { Button } from '@/components/Button'
import { button, clickAnimation } from '@/components/Button/Button.css';
import { login, spotifyLogo } from '@/components/Login/Login.css';
import spotifyImage from '@/assets/Full_Logo_White_RGB.svg';
import { useEffect, useRef } from 'react';


interface LoginProps {
    onLogin: () => void,
    fallBack: () => void,
}
export const Login = ({ onLogin, fallBack }: LoginProps) => {
  const spotifyRef = useRef<HTMLButtonElement>(null);
  const altRef = useRef<HTMLButtonElement>(null);

  let spotifyButton: HTMLButtonElement;
  let altButton: HTMLButtonElement;
  const onSpotifyStart = () => {
    spotifyButton.style.transform = "scale(0.95)";
  }

  const onSpotifyEnd = () => {
    spotifyButton.style.transform = "scale(1)";
  }

  const altRefStart = () => {
    altButton.style.transform = "scale(0.95)";

  }

  const altRefEnd = () => {
    altButton.style.transform = "scale(1)";
  }

  useEffect(() => {
    if (!spotifyRef.current || !altRef.current) {
      console.error("reference Error");
      return;
    }
    spotifyButton = spotifyRef.current;
    altButton = altRef.current;

    // spotifyButton.addEventListener("mousedown", onSpotifyStart);
    // spotifyButton.addEventListener("mouseup", onSpotifyEnd);
    // spotifyButton.addEventListener("touchstart", onSpotifyStart);
    // spotifyButton.addEventListener("touchEnd", onSpotifyEnd);
    // spotifyButton.addEventListener("mouseleave", onSpotifyEnd);
    // spotifyButton.addEventListener("dragend", onSpotifyEnd);
    // altButton.addEventListener("mousedown", altRefStart);
    // altButton.addEventListener("mouseup", altRefEnd);
    // altButton.addEventListener("touchstart", altRefStart);
    // altButton.addEventListener("touchEnd", altRefEnd);
    // altButton.addEventListener("mouseleave", altRefEnd);
    // altButton.addEventListener("dragend", altRefEnd);

    return () => {
      // spotifyButton.removeEventListener("mousedown", onSpotifyStart);
      // spotifyButton.removeEventListener("mouseup", onSpotifyEnd);
      // spotifyButton.removeEventListener("touchstart", onSpotifyStart);
      // spotifyButton.removeEventListener("touchEnd", onSpotifyEnd);
      // spotifyButton.removeEventListener("mouseleave", onSpotifyEnd);
      // spotifyButton.removeEventListener("dragend", onSpotifyEnd);
      // altButton.removeEventListener("mousedown", altRefStart);
      // altButton.removeEventListener("mouseup", altRefEnd);
      // altButton.removeEventListener("touchstart", altRefStart);
      // altButton.removeEventListener("touchEnd", altRefEnd);
      // altButton.removeEventListener("mouseleave", altRefEnd);
      // altButton.removeEventListener("dragend", altRefEnd);
    }
  })
  return (
      <div className={login}>
        <button className={button.spotify} ref={spotifyRef} onClick={onLogin}>
          Connect with <img className={spotifyLogo} src={spotifyImage}></img>
        </button>
        <button className={button.primary} ref={altRef} onClick={fallBack}>
          TRY ANOTHER WAY
        </button>
      </div>
  );
}

