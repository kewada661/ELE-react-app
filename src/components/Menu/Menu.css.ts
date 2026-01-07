import { fontFace, style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css';
import fluoxetineURL from '@/assets/font/fluoxetine/Fluox___.ttf'

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
  background: '#000000c4',
})

const fluoxetine = fontFace({
  src: `url(${fluoxetineURL})`,
})

export const options = style({
  display: 'flex',
  flexDirection: 'column',
  margin: "0 auto",
  '> button': {
    padding: '.75em',
    background: 'none',
    border: 'none',
    color: vars.color.light.secondary,
    fontFamily: `${fluoxetine}, monospace`,
    letterSpacing: '.25rem',
    fontSize: vars.fontSize.xlarge,
  }
})