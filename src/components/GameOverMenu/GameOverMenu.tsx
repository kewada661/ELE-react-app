import { menu, button, circularButton, scoreContainer, houseFilter, house } from '@/components/GameOverMenu/GameOverMenu.css';
import { IconFacebook } from '@/ui/icons/IconFacebook';
import { IconInstagram } from '@/ui/icons/IconInstagram';
import { IconLink } from '@/ui/icons/IconLink';
import { IconTwitter } from '@/ui/icons/IconTwitter';
import { useEffect, useState } from 'react';

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
    <div id="gameOverMenu" className={menu.gameover}>
      <h1>YOUR SCORE</h1>
      <div className={scoreContainer}>
        <img className={house} src="/src/assets/Album-Art-house copy 1.png" alt="" />
        <div className={houseFilter} />
        <h3 id="go_score">{score}</h3>
      </div>
      {(!shareButtons) ? (
        <div className={menu.gameover}>
          <button className={button.submit} onClick={submitScore}>Submit your score</button>
          <button className={button.playAgain} onClick={newGameCallback}>Play Again</button>
          <div>
            <button className={button.share} onClick={() => setShareButtons(true)} >Share Score</button>
            <button className={button.share} onClick={leaderboardCallback}id="leaderboard">Leaderboard</button>
          </div>
          <button className={button.playlist} onClick={playlistCallback}>Join The Edghill Playlist</button>
        </div>
      ) : (
        <div className={menu.gameover}>
          <p>Share with Friends</p>
          <div>
            <button className={circularButton}>
              <IconLink size={"32"}/>
            </button>
            <button className={circularButton}>
              <IconFacebook size={"32"}/>
            </button>
            <button className={circularButton}>
              <IconInstagram size={"32"}/>
            </button>
            <button className={circularButton}>
              <IconTwitter size={"32"}/>
            </button>
          </div>
          <button onClick={() => setShareButtons(false)}>Go Back</button>
        </div>
      )}
    </div>
  )
}