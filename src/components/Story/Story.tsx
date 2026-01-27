import { storyContainer, storyText, chevron, continueContainer, continueText, characterSelect, selectButton, buttonDiv, sprite } from "@/components/Story/Story.css";
import { IconChevronLeft } from "@/ui/icons/IconChevronLeft";
import { IconChevronRight } from "@/ui/icons/IconChevronRight";
import { useRef, useEffect,useState } from 'react'
import sprites from '@/assets/sprites/ELE character sprites.png';
import { IconChevronDown } from "@/ui/icons/IconChevronDown";
import { doc } from "prettier";

interface StoryProps {
  loadingPlayer: boolean;
  onContinue: (index: number) => void;
}

export const Story = ({ loadingPlayer, onContinue }: StoryProps) => {
  const continueRef = useRef<HTMLParagraphElement>(null);
  const [selection, setSelection] = useState(2);

  useEffect(() => {
    if (continueRef.current) {
      if (!loadingPlayer) {
        continueRef.current.style.visibility = 'visible';
        continueRef.current.style.opacity = '1';
      }
    }

  },[loadingPlayer])

  const handleChris = () => {
    setSelection(2);
    const pointer = document.getElementById('chevron')!;
    pointer.className = chevron.left;
  }

  const handleJake = () => {
    setSelection(1);
    const pointer = document.getElementById('chevron')!;
    pointer.className = chevron.center;
  }

  const handleAidan = () => {
    setSelection(0);
    const pointer = document.getElementById('chevron')!;
    pointer.className = chevron.right;
  }

  return (
    <div className={storyContainer}>
      <p className={storyText}>Chris, Jake, and Aidan are trying to reach their house in the sky. Help bring them home!</p>
      <div id='chevron' className={chevron.left}><IconChevronDown size="32" /></div>
      <div className={characterSelect}>
        <div className={buttonDiv}>
          <button className={selectButton} onClick={handleChris}><img className={sprite.chris} src={sprites} /></button>
          Chris
        </div>
        <div className={buttonDiv}>
          <button className={selectButton} onClick={handleJake}><img className={sprite.jake} src={sprites} /></button>
          Jake
        </div>
        <div className={buttonDiv}>
          <button className={selectButton} onClick={handleAidan}><img className={sprite.aidan} src={sprites} /></button>
          Aidan
        </div>
      </div>
      <div className={continueContainer} ref={continueRef}>        
        <p className={continueText} onClick={() => onContinue(selection)}>Continue</p>
      </div>
    </div>
  )
}