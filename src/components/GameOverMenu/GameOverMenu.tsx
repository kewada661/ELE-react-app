import { 
  headerLogo, 
  menu, 
  button, 
  yourScore, 
  scoreContainer, 
  houseFilter, 
  shareLeaderboard, 
  house, 
  shareOptions, 
  shareButtonContainer, 
  circularButton,
  copiedMessage,
  copiedAnimation,
  shareImage,
  canvas,
 } from '@/components/GameOverMenu/GameOverMenu.css';
import { IconUpload } from '@/ui/icons/IconUpload';
import { IconRefreshCw } from '@/ui/icons/IconRefreshCw';
import { IconFacebook } from '@/ui/icons/IconFacebook';
import { IconInstagram } from '@/ui/icons/IconInstagram';
import { IconLink } from '@/ui/icons/IconLink';
import { IconTwitter } from '@/ui/icons/IconTwitter';
import { footerLogo } from '@/App.css';
import { useEffect, useRef, useState } from 'react';
import bgImageURL from '@/assets/9x16-edgehill 1.png'
import houseImage from '@/assets/house-sprite.png';
import footerLogoURL from '@/assets/GamingLabelFooter.png';
import shareImageURL from '@/assets/shareImage.jpg';

interface GameOverMenuProps {
  score: number;
  loggedIn: boolean;
  submitScoreCallback: (score: number) => Promise<void>;
  newGameCallback: () => void;
  shareScoreCallback?: () => void;
  leaderboardCallback: () => void;
  playlistCallback: () => void;
}

export const GameOverMenu = ({ 
  score, 
  loggedIn, 
  submitScoreCallback, 
  newGameCallback, 
  shareScoreCallback, 
  leaderboardCallback, 
  playlistCallback 
}: GameOverMenuProps) => {
  const [shareButtons, setShareButtons] = useState(false);
  const [instagramURL, setInstagramURL] = useState(shareImageURL);
  const copiedMessageRef = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const houseRef = useRef<HTMLImageElement>(null);
  const aRef = useRef<HTMLAnchorElement>(null);
  let ctx: CanvasRenderingContext2D | null;

  const submitScore = async () => {
    await submitScoreCallback(score);
    leaderboardCallback();
  }

  const handleCopyLink = () => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText('https://ode.edgehillband.com/').then(() => {
        copiedMessageRef.current?.classList.add(copiedAnimation);
      })
    } else {
      open('https://ode.edgehillband.com/');
    }
  }

  const handleFacebook = () => {
    open('https://www.facebook.com/sharer/sharer.php?u=https%3A//ode.edgehillband.com/');
  }

  const handleInstagram = () => {
    if (ctx) {

    }
  }

  const handleTwitter = () => {
    open('https://twitter.com/intent/tweet?text=The%20Edgehill%20interactive%20experience%20is%20LIVE.%20Step%20into%20the%20world%20of%20Ode%20to%20the%20Greyhouse.%20%F0%9F%8F%A0%F0%9F%94%A5%0A%0AExperience%20it%20NOW%3A%20https%3A//ode.edgehillband.com/');
  }

  const handleAnimationEnd = () => {
    copiedMessageRef.current?.classList.remove(copiedAnimation);
  }

  useEffect(() => {
    copiedMessageRef.current?.addEventListener("animationend", handleAnimationEnd);
    if (
      canvasRef.current &&
      imageRef.current &&
      houseRef.current
    ) {
      ctx = canvasRef.current.getContext('2d');
      ctx!.drawImage(imageRef.current, 0, 0, 900, 1600, 0, 0, 900, 1600);
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      ctx!.fillStyle = "#ffffff";
      ctx!.font = "200px \"Jersey 10\"";
      ctx!.fillText(score.toString(), 450, 798);
      canvasRef.current.toBlob((blob) => {
        if (blob === null) return;
        setInstagramURL(window.URL.createObjectURL(blob));
      }, 
      "image/jpeg",
      1
    )}
    return () => {
    copiedMessageRef.current?.removeEventListener("animationend", handleAnimationEnd);
    window.URL.revokeObjectURL(instagramURL);
    }
  }, [imageRef.current])

  return (
    <div id="gameOverMenu" className={menu.main}>
      <p onClick={() => open('https://bigloudrock.com/edgehill')}className={headerLogo}>edgehill</p>
      <div className={yourScore}>
        <h1>YOUR SCORE</h1>
        <div className={scoreContainer}>
          <div className={houseFilter} />
          <img className={house} ref={houseRef} src={houseImage} alt="" />
          <h3 id="go_score">{score}</h3>
        </div>
      </div>
      {(!shareButtons) ? (
        <div className={menu.gameover}>
          <button className={button.submit} onClick={submitScore}>
            <IconUpload /> Submit your score
          </button>
          <button className={button.playAgain} onClick={newGameCallback}>
            <IconRefreshCw />  Play Again
          </button>
          <div className={shareLeaderboard}>
            <button className={button.share} onClick={() => setShareButtons(true)}>
              Share Score
            </button>
            <button className={button.share} onClick={leaderboardCallback}id="leaderboard">
              Leaderboard
            </button>
          </div>
          <button className={button.playlist} onClick={playlistCallback}>Join The Edghill Playlist</button>
        </div>
      ) : (
        <div className={menu.share}>
          <p>Share with Friends</p>
          <div className={shareOptions}>
            <div className={shareButtonContainer}>
              <button id="link" className={circularButton} onClick={handleCopyLink}>
                <IconLink size={"32"}/>
              </button>
              <p className={copiedMessage} ref={copiedMessageRef}>Copied!</p>
              <p>Copy Link</p>
            </div>
            <div className={shareButtonContainer} onClick={handleFacebook}>
              <button id="facebook" className={circularButton}>
                <IconFacebook size={"32"}/>
              </button>
              <p>Facebook</p>
            </div>
            <div className={shareButtonContainer} onClick={handleInstagram}>
              <a id="instagram" className={circularButton} ref={aRef} href={instagramURL} download="edgehill-listening-experience.jpeg">
                <IconInstagram size={"32"}/>
              </a>
              <p>Instagram</p>
            </div>
            <div className={shareButtonContainer} onClick={handleTwitter}>
              <button id="x" className={circularButton}>
                <IconTwitter size={"32"}/>
              </button>
              <p>X</p>
            </div>
          </div>
          <button className={button.goBack} onClick={() => setShareButtons(false)}>Go Back</button>
        </div>
      )}
      <img onClick={() => open('https://bigloudrock.com')} className={footerLogo} src={footerLogoURL} />
      <img className={shareImage} ref={imageRef} src={shareImageURL} />
      <canvas className={canvas} ref={canvasRef} width="900" height="1600"/>
    </div>
  )
}