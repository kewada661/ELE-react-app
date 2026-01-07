import { headerLogo, menu, button, circularButton, yourScore, scoreContainer, houseFilter, shareLeaderboard, house, shareOptions } from '@/components/GameOverMenu/GameOverMenu.css';
import { IconUpload } from '@/ui/icons/IconUpload';
import { IconRefreshCw } from '@/ui/icons/IconRefreshCw';
import { IconFacebook } from '@/ui/icons/IconFacebook';
import { IconInstagram } from '@/ui/icons/IconInstagram';
import { IconLink } from '@/ui/icons/IconLink';
import { IconTwitter } from '@/ui/icons/IconTwitter';
import { useState } from 'react';
import houseImage from '@/assets/Album-Art-house copy 1.png';

interface GameOverMenuProps {
  score: number;
  loggedIn: boolean;
  submitScoreCallback: (score: number) => void;
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
    submitScoreCallback(score);
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
            <IconRefreshCw /> Play Again</button>
          <div className={shareLeaderboard}>
            <button className={button.share} onClick={() => setShareButtons(true)} >
              Share Score</button>
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
            <div>
              <button id="link" className={circularButton}>
                <IconLink size={"32"}/>
              </button>
              <p>Copy Link</p>
            </div>
            <div>
              <button id="facebook" className={circularButton}>
                <IconFacebook size={"32"}/>
              </button>
              <p>Facebook</p>
            </div>
            <div>
              <button id="instagram" className={circularButton}>
                <IconInstagram size={"32"}/>
              </button>
              <p>Instagram</p>
            </div>
            <div>
              <button id="x" className={circularButton}>
                <IconTwitter size={"32"}/>
              </button>
              <p>X</p>
            </div>
          </div>
          <button className={button.goBack} onClick={() => setShareButtons(false)}>Go Back</button>
        </div>
      )}
    </div>
  )
}