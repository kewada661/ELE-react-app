import { Button } from '@/components/Button'
import { button } from '@/components/Button/Button.css';
import { login, spotifyLogo } from '@/components/Login/Login.css';
import spotifyImage from '@/assets/Full_Logo_White_RGB.svg';


interface LoginProps {
    onLogin: () => void,
    fallBack: () => void,
}
export const Login = ({ onLogin, fallBack }: LoginProps) => {
  return (
      <div className={login}>
        <Button className={button.spotify} onClick={onLogin}>
          Connect with <img className={spotifyLogo} src={spotifyImage}></img>
        </Button>
        <Button className={button.primary} onClick={fallBack}>
          TRY ANOTHER WAY
        </Button>
      </div>
  );
}

