import { storyContainer, storyText, continueContainer, continueText, characterSelect, characters, sprite } from "@/components/Story/Story.css";
import { IconChevronLeft } from "@/ui/icons/IconChevronLeft";
import { IconChevronRight } from "@/ui/icons/IconChevronRight";
import { useRef, useEffect,useState, useCallback } from 'react'
import sprites from '@/assets/sprites/ELE character sprites.png';

interface StoryProps {
  loadingPlayer: boolean;
  onContinue: (index: number) => void;
}

export const Story = ({ loadingPlayer, onContinue }: StoryProps) => {
  const continueRef = useRef<HTMLParagraphElement>(null);
  const leftRef = useRef<HTMLImageElement>(null);
  const centerRef = useRef<HTMLImageElement>(null);
  const rightRef = useRef<HTMLImageElement>(null);
  const [selection, setSelection] = useState(0);

  useEffect(() => {
    if (continueRef.current) {
      if (!loadingPlayer) {
        continueRef.current.style.visibility = 'visible';
        continueRef.current.style.opacity = '1';
      }
    }

  },[loadingPlayer])

  const classNames = [
    sprite.left,
    sprite.center,
    sprite.right
  ];

  const handleLeft = () => {
    if (selection <= 0) {
      setSelection(2);
    } else {
      setSelection(prev => prev - 1);
    }
  }

  const handleRight = () => {
    if (selection >= 2) {
      setSelection(0);
    } else {
      setSelection(prev => prev + 1);
    }
  }

  // useEffect(() => {
  //   if (
  //     !leftRef.current ||
  //     !centerRef.current ||
  //     !rightRef.current
  //   ) {
  //     return;
  //   }
  //   leftRef.current.addEventListener('click', handleLeft)
  //   centerRef.current.addEventListener('click', handleCenter)
  //   rightRef.current.addEventListener('click', handleRight)

  //   return () => {
  //     if (leftRef.current) leftRef.current.removeEventListener('click', handleLeft)
  //     if (centerRef.current) centerRef.current.removeEventListener('click', handleCenter)
  //     if (rightRef.current) rightRef.current.removeEventListener('click', handleRight)
  //   }
  // })
  return (
    <div className={storyContainer}>
      <p className={storyText}>Chris, Jake, and Aidan are trying to reach their house in the sky. Help bring them home!</p>
      <div className={characterSelect}>
        <button onClick={handleLeft}><IconChevronLeft size="32"/></button>
        <img className={classNames[selection]} src={sprites} />
        <button onClick={handleRight}><IconChevronRight size="32"/></button>
      </div>
      <div className={continueContainer} ref={continueRef}>        
        <p className={continueText} onClick={() => onContinue(selection)}>Continue</p>
      </div>
    </div>
  )
}