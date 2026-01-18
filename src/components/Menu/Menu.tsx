import { menu, options, option } from '@/components/Menu/Menu.css'
interface MenuProps {
  isOpen: boolean;
  loggedIn: boolean;
  leaderboardCallback: () => void;
  playlistCallback: () => void;
  loginCallback: () => void;
  logoutCallback: () => void;
}

export const Menu = ({ isOpen, loggedIn, leaderboardCallback, playlistCallback, loginCallback, logoutCallback }: MenuProps) => {
  if (!isOpen) return null;
  const website = () => {
    open('https://bigloudrock.com/edgehill');
  }

  return (
    <div className={menu}>
      <div className={options}>
        <button className={option} onClick={leaderboardCallback}>Leaderboard</button>
        <button className={option} onClick={website}>Official Website</button>
        <button className={option} onClick={playlistCallback}>Add Playlist</button>
        {(loggedIn) ? (
          <button className={option} onClick={logoutCallback}>Log Out</button>
        ) : (
          <button className={option} onClick={loginCallback}>Connect Spotify</button>
        )}
      </div>
    </div>
  )
}