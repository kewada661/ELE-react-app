import { style } from '@vanilla-extract/css';

export const login = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100vw',
  maxWidth: '100vh',
  height: '40svh',
  // position: 'relative',
  // top: '30%',
  alignSelf: 'center',
  zIndex: 1,
})

export const spotifyLogo = style({
  maxWidth: 125,
  padding: "0 0 0 .5em"
})