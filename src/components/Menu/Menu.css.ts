import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css';

export const menu = style({
  width: '100vw',
  maxWidth: '100vh',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
  justifySelf: 'center',
  position: 'fixed',
  margin: '0 auto',
  top: '0',
  zIndex: 1,
  background: '#0000007f',
})

export const options = style({
  display: 'flex',
  flexDirection: 'column',
  margin: "0 auto",
  fontFamily: 'fluoxetine, monospace',
  fontSize: vars.fontSize.xlarge,
  '> button': {
    padding: '.75em',
    background: 'none',
    border: 'none',
    color: vars.color.light.secondary,
  }
})