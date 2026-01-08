import { useCallback, useEffect, useRef, useState } from 'react';
import { Header } from '@/components/Header';
import { JumpGame } from '@/components/JumpGame';
import { house, mainContainer, startButtonContainer, logo, subtitle, footerLogo} from '@/App.css';
import { button } from '@/components/Button/Button.css'
import { Login } from '@/components/Login';
import { LoginFallback } from '@/components/LoginFallback'
import { Menu } from '@/components/Menu';
import { Leaderboard } from '@/components/Leaderboard';
import { GameOverMenu } from '@/components/GameOverMenu';
import houseImage from '@/assets/Album-Art-house copy 1.png';
import bglImage from '@/assets/footer logos.png';

export const App = () => {
  const [startButton, setStartButton] = useState(true);
  const [gameInProgress, setGameInProgress] = useState(true);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<Error>();
  const [email, setEmail] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [loadingPlayer, setLoadingPlayer] = useState(true);

  const embedControllerRef = useRef(null);
  const playerRef = useRef(null);

  // var codeVerifier = localStorage.getItem("codeVerifier");

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
    localStorage.setItem("codeVerifier2", code_verifier);
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
      const codeVerifier = localStorage.getItem("codeVerifier");
      console.log("3.", codeVerifier);
      const response = await fetch(`/api/auth/token?code=${code}&code_verifier=${codeVerifier}&state=${state}`);

      if (!response.ok || response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      
      return response.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
        console.error('Fetch error:', error);
      }
      else {
        console.error('Unknown Error occurred');
      }
      return null;
    }
  }

  const getToken = async (code: any, state: any) => {
    const result = await requestToken(code, state);
    if (result !== null) {
      setLoggedIn(true);
      sessionStorage.setItem("token", result.access_token);
      sessionStorage.setItem("refresh_token", result.refresh_token);
      sessionStorage.setItem("email", result.email);
      sessionStorage.setItem("product", result.product);
    } else {
      setEmail(true);
      alert("Spotify authentication failed... please log in below.");
    }
  }

  const savePlaylist = async () => {
    const access_token = sessionStorage.getItem('token');
    if (access_token === "fallback") {
      open('https://open.spotify.com/playlist/37i9dQZF1DZ06evO08vsxh?si=334e45e76dbc4d94&nd=1&dlsi=21e7486297eb4c50');
    } else {
      const response = await fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DZ06evO08vsxh/followers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          public: false,
        })
      });
      if (response) console.log(response);      
    }
  }

  const transferPlayback = async (device_id: string) => {
    const access_token = sessionStorage.getItem("token");
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

  const initializeEmbedPlayback = async () => {
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);
    // const response = await fetch(`/api/audiomack/play?id=lol-0331892`, {
    //   method: "GET",
    // })

    // if (!response.ok) console.log("Audiomack fetch error:", response);
    // else console.log("Audiomack successful fetch:", response);
  }

  const startWebPlayback = async () => {
    console.log('starting web playback');
    const device_id = sessionStorage.getItem("device_id");
    const access_token = sessionStorage.getItem("token");
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

  const startEmbedPlayback = async() => {
    console.log('starting embed playback');
    if (embedControllerRef.current) embedControllerRef.current.play();
  }

  const updateLeaderboard = useCallback( async (score: number) => {
    const email = sessionStorage.getItem("email");
    const access_token = sessionStorage.getItem("token");
    console.log("clientside body:", {
      token: access_token,
      email: email,
      score: score,
    })
    await fetch('/api/db/leaderboard', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'token': access_token,
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

  const fallBack = useCallback(() => {
    setEmail(true);
    sessionStorage.setItem("token", "fallback");
    // initializeEmbedPlayback();
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
    sessionStorage.clear();
    setGameInProgress(true);
    setMenuOpen(false);
    setLoggedIn(false);
    setEmail(false);
    // initializeEmbedPlayback();
  }

  const handleStartButton = () => {
    setStartButton(false);
    if (playerRef.current) {
      playerRef.current.resume();
      console.log('resuming web pb');
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
    if (playerRef.current) playerRef.current.resume();
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
      getToken(code, state).then(() => {
        const product = sessionStorage.getItem("product");
        if (product !== null && product === "premium") {
          console.log("user has Spotify Premium");
          initializeWebPlayback();
        } else {
          console.log("user has not Spotify Premium");
          initializeEmbedPlayback();
        }
      });
    }

  }, [])

  useEffect(() => {
    addEventListener("visibilitychange", onVisibilityChange);
    sessionStorage.setItem("startTime", Date.now().toString());

    return () => {
      removeEventListener("visibilitychange", onVisibilityChange);
    }
  }, [])

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const access_token = sessionStorage.getItem("token")
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb: any) => { cb(access_token); },
        volume: 0.5
      });
      player.setName("Edgehill Listening Experience");

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

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = document.getElementById('embed-iframe');
      const options = {
          width: '0%',
          height: '0%',
          uri: 'spotify:album:2IXmFxN6dFY8ROSKu8nfwl'
        };
      const callback = async (EmbedController) => {
        EmbedController.addListener("ready", () => {setLoadingPlayer(false)});
        embedControllerRef.current = EmbedController;
        console.log("Embed Playback ready!:", embedControllerRef);
        startEmbedPlayback();
      };
      IFrameAPI.createController(element, options, callback);
    };
    
    sessionStorage.setItem('current_track', '');

    return () => {
      if (playerRef.current) {
        playerRef.current.disconnect();
        playerRef.current.removeListener('player_state_changed');
        playerRef.current.removeListener('not_ready');
        playerRef.current.removeListener('ready');
        playerRef.current = null;
      }
      if (embedControllerRef.current) {
        embedControllerRef.current.removeListener('ready');
        embedControllerRef.current = null;
      }
    }
  }, [])

  return (
    <>
      <main className={mainContainer}>
        <Header menuOpen={menuOpen} volumeCallback={toggleMuted} menuCallback={toggleMenu} leaderboardOpen={leaderboardOpen}/>
        <div id='embed-iframe'></div>
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
            <img className={house} src={houseImage} alt="" />
            {(email) ? (
              <LoginFallback loginCallback={loginCallback} />
            ) : (
              <Login 
                onLogin={requestLogin} 
                fallBack={fallBack}
              />
            )}
          </>
        )}
        <img onClick={() => open('https://bigloudrock.com')} className={footerLogo} src={bglImage} />
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
