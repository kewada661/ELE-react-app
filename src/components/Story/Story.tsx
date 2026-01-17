import { storyContainer, storyText, continueContainer, continueText } from "@/components/Story/Story.css";
import { useRef, useEffect } from 'react'

interface StoryProps {
  loadingPlayer: boolean;
  onContinue: () => void;
}

export const Story = ({ loadingPlayer, onContinue }: StoryProps) => {
  const continueRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (continueRef.current) {
      if (!loadingPlayer) {
        continueRef.current.style.visibility = 'visible';
        continueRef.current.style.opacity = '1';
      }
    }

  },[loadingPlayer])

  return (
    <div className={storyContainer}>
      <p className={storyText}>Chris, Jake, and Aidan are trying to reach their house in the sky. Help bring them home!</p>
      <div className={continueContainer} ref={continueRef}>
        <p className={continueText} onClick={onContinue}>Continue</p>
      </div>
    </div>
  )
}