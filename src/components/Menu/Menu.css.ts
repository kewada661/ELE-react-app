import { fontFace, style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css';
import fluoxetineURL from '@/assets/font/fluoxetine/Fluox___.ttf'

export const menu = style({
  width: '100vw',
  maxWidth: '100svh',
  height: '100svh',
  alignSelf: 'center',
  display: 'flex',
  alignItems: 'center',
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