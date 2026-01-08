import { IconVolume2 } from "@/ui/icons/IconVolume2"
import { IconMenu } from "@/ui/icons/IconMenu"
// import { IconButton } from "@/ui/primitives/IconButton/IconButton"
import { header, headerButton } from "@/components/Header/Header.css"
import { useCallback, useState } from "react";
import { IconVolumeX } from "@/ui/icons/IconVolumeX";
import { IconX } from "@/ui/icons/IconX"

interface HeaderProps {
  volumeCallback: (muted: boolean) => void;
  menuCallback: () => void;
  menuOpen: boolean;
  leaderboardOpen: boolean;
}
export const Header = ({ volumeCallback, menuCallback, menuOpen, leaderboardOpen }: HeaderProps) => {
  const [muted, setMuted] = useState(false);

  const toggleMute = useCallback(() => {
    volumeCallback(muted);
    setMuted(prev => !prev);
  }, [muted])

  const toggleMenu = useCallback(() => {
    if (!leaderboardOpen) {
      menuCallback();
    }
  }, [menuOpen, leaderboardOpen])
  return (
    <div className={header}>
      <button onClick={toggleMute} className={headerButton}>
        {(muted) ? (<IconVolumeX size={'32'}/>) : (<IconVolume2 size={'32'}/>)}
      </button>
      <button id="menu" onClick={toggleMenu} className={headerButton}>
        {(menuOpen) ? (<IconX size={'32'}/>) : (<IconMenu size={'32'}/>)}
      </button>
    </div>
  )
}