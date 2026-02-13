import { useCallback, useEffect, useRef, useState } from 'react';
import { Header } from '@/components/Header';
import { Story } from '@/components/Story';
import { JumpGame } from '@/components/JumpGame';
import { background, mainContainer, houseContainer, house, logo, subtitle, footerLogo} from '@/App.css';
import { Lock } from '@/components/Lock';
import { Login } from '@/components/Login';
import { LoginFallback } from '@/components/LoginFallback'
import { Menu } from '@/components/Menu';
import { Leaderboard } from '@/components/Leaderboard';
import { GameOverMenu } from '@/components/GameOverMenu';
import houseImage from '@/assets/house-sprite.png';
import footerLogoURL from '@/assets/GamingLabelFooter.png';
import backgroundGifURL from '@/assets/bg-vert-cloud.gif';
import Hls from 'hls.js';

export const App = () => {
  const [gameInProgress, setGameInProgress] = useState(true);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<Error>();
  const [locked, setLocked] = useState(true);
  const [altLogin, setAltLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [story, setStory] = useState(true);
  const [loadingPlayer, setLoadingPlayer] = useState(true);
  const [spriteIndex, setSpriteIndex] = useState(0);
  const playerRef = useRef(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const houseRef = useRef<HTMLImageElement>(null);
  const hls = new Hls();

  var SCTrackNumber = 0;
  var widget: any = null;
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
    open('https://open.spotify.com/album/6zvEun7yEcafFkJRC9jB2O');
    // if (altLogin) {
    //   open('https://open.spotify.com/album/1fogKIAKBsiW6RBXP6Esyl?si=334e45e76dbc4d94&nd=1&dlsi=21e7486297eb4c50');
    // } else {
      // const email = sessionStorage.getItem("email")
      // const response = await fetch(`/api/spotify/playlist?email=${email}`);
      // if (response) console.log(response);      
    // }
  }

  const initializeWebPlayback = () => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
  }

  const initializeSCPlayback = () => {
    hls.loadSource(`api/soundcloud/stream?track=${SCTrackNumber}`);
    hls.attachMedia(audioRef.current!);
    setLoadingPlayer(false);
  }

  const advanceSCPlayback = () => {
    console.log("track ended");
    incrementUserStreams();
    hls.detachMedia();
    SCTrackNumber += 1;
    hls.loadSource(`api/soundcloud/stream?track=${SCTrackNumber}`);
    hls.attachMedia(audioRef.current!);
    audioRef.current?.play();
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


  const loginCallback = () => {
    setLoggedIn(true);
    initializeSCPlayback();
  }

  const toggleLeaderboard = () => {
    setLeaderboardOpen(prev => !prev);
  }

  const toggleMuted = (muted: boolean) => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
    }
    if (playerRef.current) {
      playerRef.current.setVolume(muted ? 0.5 : 0.0);
      console.log("volume change");
    }
    const iframeElement = document.querySelector('iframe');
    widget = SC.Widget(iframeElement);
    widget.setVolume(muted ? 100 : 0);
  }

  const logout = async () => {
    await stopWebPlayback();
    if (audioRef.current) audioRef.current.pause();
    const iframeElement = document.querySelector('iframe');
    widget = SC.Widget(iframeElement);
    widget.pause();
    SCTrackNumber = 0;
    sessionStorage.clear();
    setGameInProgress(true);
    setLoadingPlayer(true);
    setStory(true);
    setMenuOpen(false);
    setLoggedIn(false);
    setAltLogin(false);
    // initializeEmbedPlayback();
  }

  const handleStart = (index: number) => {
    setStory(false);
    setSpriteIndex(index);
    if (playerRef.current) {
      playerRef.current.resume();
      console.log('resuming web pb');
    } else if (audioRef.current) {
      audioRef.current.play();
      console.log('starting audio pb');
    } else {
      const iframeElement = document.querySelector('iframe');
      widget = SC.Widget(iframeElement);
      console.log("widget established");      
      widget.play();
    }
  }

  const gameOver = useCallback((score: number) => {
    console.log("GAME IS OVER");
    setScore(score);
    setGameInProgress(false);
    console.log("score:", score);
    console.log("gameInProgress:", gameInProgress);
  }, [score, gameInProgress])

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
          // initializeSCPlayback();
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

  useEffect(() => {
      audioRef.current?.addEventListener("ended", advanceSCPlayback);

    return () => {
      audioRef.current?.removeEventListener("ended", advanceSCPlayback);
    }
  }, [])

  return (
    <>
      <main id='main' className={mainContainer}>
        {/* <video className={background} poster={backgroundPosterURL} autoPlay playsInline muted loop controls={false}>
          <source src={backgroundURL} type='video/mp4' />
        </video> */}
        <img className={background} src={backgroundGifURL} />
        <Header 
          menuOpen={menuOpen} 
          volumeCallback={toggleMuted} 
          menuCallback={() => setMenuOpen(prev => !prev)} 
          leaderboardOpen={leaderboardOpen}
        />
        {/* <audio id="audio" ref={audioRef} /> */}
        {/* <iframe id="sc-widget" src="" */}
        {(loggedIn) ? (
          (story) ? (
            <Story
              loadingPlayer={loadingPlayer}
              onContinue={handleStart}
            />
          ) : (
            (gameInProgress) ? (
                <JumpGame 
                  gameOverCallback={gameOver}
                  menuCallback={() => setMenuOpen(true)}
                  spriteIndex={spriteIndex}
                />
            ) : (
              <GameOverMenu
                score={score}
                loggedIn={loggedIn}
                submitScoreCallback={updateLeaderboard}
                newGameCallback={() => setGameInProgress(true)}
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
              <LoginFallback 
                loginCallback={loginCallback} 
              />
            ) : (
              <Login 
                onLogin={requestLogin} 
                fallBack={() => setAltLogin(true)}
              />
            )}
            <img onClick={() => open('https://bigloudrock.com')} className={footerLogo} src={footerLogoURL} />
          </>
        )}
        {(leaderboardOpen) ? (<Leaderboard leaderboardClose={() => setLeaderboardOpen(false)}/>) : (<></>)}
        <Menu 
          isOpen={menuOpen} 
          loggedIn={loggedIn}
          leaderboardCallback={() => setLeaderboardOpen(true)}
          playlistCallback={savePlaylist}
          loginCallback={requestLogin}
          logoutCallback={logout}
        />
      </main>
      <iframe width="0%" height="0" scrolling="no" frameBorder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2186986802&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
      {/* <div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;">
        <a href="https://soundcloud.com/edgehill-band" title="Edgehill" target="_blank" style="color: #cccccc; text-decoration: none;">
          Edgehill
        </a> · <a href="https://soundcloud.com/edgehill-band/sets/ode-to-the-greyhouse-1" title="Ode to the Greyhouse" target="_blank" style="color: #cccccc; text-decoration: none;">
          Ode to the Greyhouse
        </a>
      </div> */}
    </>
  );
};
