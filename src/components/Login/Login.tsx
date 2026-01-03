import { Button } from '@/components/Button'
import { button } from '@/components/Button/Button.css';
import { login, spotifyLogo } from '@/components/Login/Login.css'


interface LoginProps {
    onLogin: () => void,
    fallBack: () => void,
}
export const Login = ({ onLogin, fallBack }: LoginProps) => {
  const generateRandomString = (length: number) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  const requestLogin = async () => {
    const state = generateRandomString(16);
    localStorage.setItem("state", state);
    location.replace(`/auth/login?state=${state}`);
  }
  // const onClick = async () => {
  //     const result = await requestLogin();
  //     if (result) {
  //         console.log("state:", result.state);
  //     }
  // }
  return (
      <div className={login}>
        <Button className={button.spotify} onClick={onLogin}>
          Connect with <img className={spotifyLogo} src="/src/assets/Full_Logo_White_RGB.svg"></img>
        </Button>
        <Button className={button.primary} onClick={fallBack}>
          Try Another Way
        </Button>
      </div>
  );
}

