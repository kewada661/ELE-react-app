import { menu, options } from '@/components/Menu/Menu.css'
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
        <button onClick={leaderboardCallback}>Leaderboard</button>
        <button onClick={website}>Official Website</button>
        <button onClick={playlistCallback}>Add Playlist</button>
        {(loggedIn) ? (
          <button onClick={logoutCallback}>Log Out</button>
        ) : (
          <button onClick={loginCallback}>Connect Spotify</button>
        )}
      </div>
    </div>
  )
}