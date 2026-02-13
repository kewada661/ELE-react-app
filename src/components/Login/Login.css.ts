import { style } from '@vanilla-extract/css';
import { button } from '../Button/Button.css';
import { vars } from '@/styles/theme.css';

export const login = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100vw',
  maxWidth: '100vh',
  height: '40svh',
  justifyContent: 'center',
  // position: 'relative',
  // top: '30%',
  alignSelf: 'center',
  zIndex: 1,
})

export const spotifyLogo = style({
  maxWidth: '45%',
})

export const playButton = style([
  button.spotify,
  {
    background: vars.color.green
  }
])