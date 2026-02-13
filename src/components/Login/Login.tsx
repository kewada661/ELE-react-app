import { Button } from '@/components/Button'
import { login, spotifyLogo, playButton } from '@/components/Login/Login.css';
import spotifyImage from '@/assets/Full_Logo_White_RGB.svg';
import { useEffect, useRef } from 'react';


interface LoginProps {
    onLogin: () => void,
    fallBack: () => void,
}
export const Login = ({ onLogin, fallBack }: LoginProps) => {

  return (
      <div className={login}>
        {/* <button className={button.spotify} onClick={onLogin}>
          Connect with <img className={spotifyLogo} src={spotifyImage}></img>
        </button> */}
        <button className={playButton} onClick={fallBack}>
          PLAY
        </button>
        {/* <button className={button.primary} onClick={fallBack}>
          TRY ANOTHER WAY
        </button> */}
      </div>
  );
}

