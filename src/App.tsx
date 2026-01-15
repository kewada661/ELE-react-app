import { useCallback, useEffect, useRef, useState } from 'react';
import { Header } from '@/components/Header';
import { JumpGame } from '@/components/JumpGame';
import { background, mainContainer, houseContainer, house, startButtonContainer, logo, subtitle, footerLogo} from '@/App.css';
import { button } from '@/components/Button/Button.css'
import { Login } from '@/components/Login';
import { LoginFallback } from '@/components/LoginFallback'
import { Menu } from '@/components/Menu';
import { Leaderboard } from '@/components/Leaderboard';
import { GameOverMenu } from '@/components/GameOverMenu';
import houseImage from '@/assets/Album-Art-house copy 1.png';
import footerLogoURL from '@/assets/GamingLabelFooter.png';
import backgroundURL from '@/assets/bg-vert.mp4';
import backgroundPosterURL from '@/assets/9x16-edgehill 1.png';
import audioURl from '@/assets/file_example_MP3_700KB.mp3';

export const App = () => {
  const [startButton, setStartButton] = useState(true);
  const [gameInProgress, setGameInProgress] = useState(true);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<Error>();
  const [altLogin, setAltLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [loadingPlayer, setLoadingPlayer] = useState(true);
  const playerRef = useRef(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const houseRef = useRef<HTMLImageElement>(null);
  // spotify auth helper functions
  const generateRandomString = (length: number) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  const sha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }
  const base64encode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  const generateLoginParams = async () => {
    const code_verifier = generateRandomString(64);
    localStorage.setItem("codeVerifier", code_verifier);
    const state = generateRandomString(16);
    const hashed = await sha256(code_verifier);
    const codeChallenge = base64encode(hashed);
    console.log("codeChallenge:", codeChallenge);
    return [codeChallenge, code_verifier, state];
  }

  const requestLogin = useCallback( async () => {
    const loginParams = await generateLoginParams();
    location.href = `/api/auth/login?code_challenge=${loginParams[0]}&code_verifier=${loginParams[1]}&state=${loginParams[2]}`;
  }, []);

  const requestToken = async (code: any, state: any) => {
    try {
      const response = await fetch(`/api/auth/token?code=${code}&state=${state}`);
      if (!response.ok || response.status !== 200) {
        throw new Error(response.status.toString());
      }

      const body = await response.json();
      sessionStorage.setItem("email", body.email);
      sessionStorage.setItem("product", body.product);
      
      setLoggedIn(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
        console.error('Fetch error:', error);
        if (error.message === '401') {
          setAltLogin(true);
          alert("Spotify authentication failed... please log in below.");
        }
      }
      else {
        console.error('Unknown Error occurred');
      }
    }
  }

  const getToken = async () => {
    try {
      const email = sessionStorage.getItem("email");
      const response = await fetch(`/api/db/users/token?email=${email}`);

      if (!response.ok || response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      const body = await response.json();
      return body.token;
    } catch (e: unknown) {
      if (error instanceof Error) {
        setError(error);
        console.error('Fetch error:', error);
      }
      else {
        console.error('Unknown Error occurred');
      }
    }
  }

  const savePlaylist = async () => {
    if (altLogin) {
      open('https://open.spotify.com/playlist/37i9dQZF1DZ06evO08vsxh?si=334e45e76dbc4d94&nd=1&dlsi=21e7486297eb4c50');
    } else {
      const email = sessionStorage.getItem("email")
      const response = await fetch(`/api/spotify/playlist?email=${email}`);
      // const response = await fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DZ06evO08vsxh/followers", {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${access_token}`,
      //   },
      //   body: JSON.stringify({
      //     public: false,
      //   })
      // });
      if (response) console.log(response);      
    }
  }

  const transferPlayback = async (device_id: string) => {
    const response = await fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        device_ids: [device_id],
        play: true,
      })
    });
    return response.json();
  }

  const initializeWebPlayback = () => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
  }

  const startWebPlayback = async () => {
    console.log('starting web playback');
    const device_id = sessionStorage.getItem("device_id");
    const access_token = await getToken();
    const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        context_uri: 'spotify:album:2IXmFxN6dFY8ROSKu8nfwl'
      })
    });
    if (response) console.log(response);
  }

  const stopWebPlayback = async () => {
    if(playerRef.current) {
      await playerRef.current.pause();
      await playerRef.current.disconnect();
    }
    playerRef.current = null;
  }

  const updateLeaderboard = useCallback( async (score: number) => {
    const email = sessionStorage.getItem("email");
    await fetch('/api/db/leaderboard', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'score': score,
      }),
    });
  }, []);

  const updateUserTime = async () => {
    const email = sessionStorage.getItem("email");
    const startTime = sessionStorage.getItem("startTime");
    if (startTime) {
      const startTimestamp = Number(startTime);
      const endTimestamp = Date.now();
      const durationMs = endTimestamp - startTimestamp;
      const duration = Math.floor(durationMs / 1000);
      if (duration < 10) return;
      await fetch(`/api/db/users/time`, {
        method: "PUT",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          'email': email,
          'duration': duration,
        })
      });
    }
  }

  const on30sElapsed = async (new_track: string) =>  {
    const current_track = sessionStorage.getItem('current_track');
    console.log("current_track:", current_track);
    console.log("new_track:", new_track);
    if (current_track != new_track) {
      sessionStorage.setItem('current_track', new_track);
      incrementUserStreams()
    }
  }

  const incrementUserStreams = useCallback( async () => {
    const email = sessionStorage.getItem("email");
    await fetch(`/api/db/users/streams`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'streams': 1,
      })
    });
  }, [])

  const onVisibilityChange = async () => {
    const email = sessionStorage.getItem("email");
    if (email && document.hidden) {
      console.log("updating time_spent")
      await updateUserTime();
      // await updateStreamCount();
    } else if (!document.hidden) {
      console.log("resetting startTime");
      sessionStorage.setItem("startTime", Date.now().toString());
    }
  }

  const onMouseMove = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') {
      const posX = event.clientX - window.innerWidth/2;
      const posY = event.clientY - window.innerHeight/2;
      if (houseRef.current) houseRef.current.style.transform = `translate(${posX*0.01}%, ${posY*0.01}%)`;
    }
  }

  const fallBack = useCallback(() => {
    setAltLogin(true);
  }, [])

  const loginCallback = () => {
    setLoggedIn(true);
    handleStartButton();
    setLoadingPlayer(false);
  }

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  }

  const openMenu = () => {
    setMenuOpen(true);
  }

  const toggleLeaderboard = () => {
    setLeaderboardOpen(prev => !prev);
  }

  const toggleMuted = (muted: boolean) => {
    if (playerRef.current) {
      playerRef.current.setVolume(muted ? 0.5 : 0.0);
      console.log("volume change");
    }
  }

  const logout = async () => {
    await stopWebPlayback();
    if (audioRef.current) audioRef.current.pause();
    sessionStorage.clear();
    setGameInProgress(true);
    setMenuOpen(false);
    setLoggedIn(false);
    setAltLogin(false);
    // initializeEmbedPlayback();
  }

  const handleStartButton = () => {
    setStartButton(false);
    if (playerRef.current) {
      playerRef.current.resume();
      console.log('resuming web pb');
    } else if (audioRef.current) {
      audioRef.current.play();
      console.log('starting audio pb');
    }
  }

  const gameOver = useCallback((score: number) => {
    console.log("GAME IS OVER");
    setScore(score);
    setGameInProgress(false);
    console.log("score:", score);
    console.log("gameInProgress:", gameInProgress);
  }, [score, gameInProgress])

  const newGame = () => {
    // if (playerRef.current) playerRef.current.resume();
    console.log("user actions");
    setGameInProgress(true);
  }

  useEffect(() => {
    // const email = sessionStorage.getItem('email');
    // const product = sessionStorage.getItem('product');
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    if (code && state) {
      requestToken(code, state).then(() => {
        const product = sessionStorage.getItem("product");
        if (product !== null && product === "premium") {
          console.log("user has Spotify Premium");
          initializeWebPlayback();
        } else {
          console.log("user has not Spotify Premium");
          setLoadingPlayer(false);
        }
      });
    }

  }, [])

  useEffect(() => {
    addEventListener("visibilitychange", onVisibilityChange);
    sessionStorage.setItem("startTime", Date.now().toString());
    addEventListener("pointermove", onMouseMove);
    return () => {
      removeEventListener("visibilitychange", onVisibilityChange);
      removeEventListener("pointermove", onMouseMove)
    }
  }, [])

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = async () => {
      const access_token = await getToken();
      const player = new window.Spotify.Player({
        name: 'Edgehill Listening Experience',
        getOAuthToken: (cb: any) => { cb(access_token); },
        volume: 0.5
      });

      player.addListener('ready', async ({ device_id }) => {
        sessionStorage.setItem("device_id", device_id);
        console.log('Ready with Device ID', device_id);
        player.activateElement();
        await startWebPlayback();
        setLoadingPlayer(false);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', async ( { 
        context: { metadata },
        position,
        track_window: { current_track } 
      } ) => {
        if (position >= 30000) {
          console.log("30s of listening!");
          console.log("metadata:", metadata);
          await on30sElapsed(current_track.name);
        }
      });

      player.connect();
      playerRef.current = player;
    }
    sessionStorage.setItem('current_track', '');

    return () => {
      if (playerRef.current) {
        playerRef.current.disconnect();
        playerRef.current.removeListener('player_state_changed');
        playerRef.current.removeListener('not_ready');
        playerRef.current.removeListener('ready');
        playerRef.current = null;
      }
    }
  }, [])

  return (
    <>
      <main id='main' className={mainContainer}>
        <video className={background} poster={backgroundPosterURL} autoPlay muted loop>
          <source src={backgroundURL} type='video/mp4' />
        </video>
        <Header menuOpen={menuOpen} volumeCallback={toggleMuted} menuCallback={toggleMenu} leaderboardOpen={leaderboardOpen}/>
        <audio ref={audioRef} src={audioURl} loop/>
        {(loggedIn) ? (
          (loadingPlayer) ? (
              <p>Loading...</p>
          ) : (
            (gameInProgress) ? (
              (startButton) ? (
                <div className={startButtonContainer}>
                  <button className={button.green} onClick={handleStartButton}>Play</button>
                </div>  
              ) : (
                <JumpGame 
                  gameOverCallback={gameOver}
                  menuCallback={openMenu}
                />
              )
            ) : (
              <GameOverMenu
                score={score}
                loggedIn={loggedIn}
                submitScoreCallback={updateLeaderboard}
                newGameCallback={newGame}
                //TODO: shareScoreCallback={}
                leaderboardCallback={toggleLeaderboard}
                playlistCallback={savePlaylist}
              />
            )
          )
        ) : (
          <>
            <p className={logo}>edgehill</p>
            <p className={subtitle}>LISTENING EXPERIENCE</p>
            <div className={houseContainer}>
              <img className={house} ref={houseRef} src={houseImage} alt="" />
            </div>
            {(altLogin) ? (
              <LoginFallback loginCallback={loginCallback} />
            ) : (
              <Login 
                onLogin={requestLogin} 
                fallBack={fallBack}
              />
            )}
            <img onClick={() => open('https://bigloudrock.com')} className={footerLogo} src={footerLogoURL} />
          </>
        )}
        {(leaderboardOpen) ? (<Leaderboard leaderboardClose={toggleLeaderboard}/>) : (<></>)}
        <Menu 
          isOpen={menuOpen} 
          loggedIn={loggedIn}
          leaderboardCallback={toggleLeaderboard}
          playlistCallback={savePlaylist}
          loginCallback={requestLogin}
          logoutCallback={logout}
        />
      </main>
    </>
  );
};
