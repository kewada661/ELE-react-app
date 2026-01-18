import { headerLogo, menu, button, yourScore, scoreContainer, houseFilter, shareLeaderboard, house, shareOptions, shareButtonContainer, circularButton } from '@/components/GameOverMenu/GameOverMenu.css';
import { IconUpload } from '@/ui/icons/IconUpload';
import { IconRefreshCw } from '@/ui/icons/IconRefreshCw';
import { IconFacebook } from '@/ui/icons/IconFacebook';
import { IconInstagram } from '@/ui/icons/IconInstagram';
import { IconLink } from '@/ui/icons/IconLink';
import { IconTwitter } from '@/ui/icons/IconTwitter';
import { footerLogo } from '@/App.css';
import { useState } from 'react';
import houseImage from '@/assets/house-sprite.png';
import footerLogoURL from '@/assets/GamingLabelFooter.png';

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

  const submitScore = async () => {
    await submitScoreCallback(score);
    leaderboardCallback();
  }

  return (
    <div id="gameOverMenu" className={menu.main}>
      <p onClick={() => open('https://bigloudrock.com/edgehill')}className={headerLogo}>edgehill</p>
      <div className={yourScore}>
        <h1>YOUR SCORE</h1>
        <div className={scoreContainer}>
          <div className={houseFilter} />
          <img className={house} src={houseImage} alt="" />
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
            <button className={button.share} onClick={() => setShareButtons(true)} >
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
              <button id="link" className={circularButton}>
                <IconLink size={"32"}/>
              </button>
              <p>Copy Link</p>
            </div>
            <div className={shareButtonContainer}>
              <button id="facebook" className={circularButton}>
                <IconFacebook size={"32"}/>
              </button>
              <p>Facebook</p>
            </div>
            <div className={shareButtonContainer}>
              <button id="instagram" className={circularButton}>
                <IconInstagram size={"32"}/>
              </button>
              <p>Instagram</p>
            </div>
            <div className={shareButtonContainer}>
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
    </div>
  )
}