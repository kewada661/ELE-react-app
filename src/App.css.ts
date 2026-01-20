import { fontFace, style } from '@vanilla-extract/css';
import { hover, active, vars } from '@/styles/theme.css';
import fluoxetineURL from '@/assets/font/fluoxetine/Fluox___.ttf';

export const background = style({
  width: '100vw',
  maxWidth: '100svh',
  height: '100svh',
  objectFit: 'cover',
  overflow: 'hidden',
  position: 'fixed',
  top: 0,
  alignSelf: 'center',
  zIndex: -1,
})

export const mainContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '100svh',
  height: '100vh',
  maxHeight: '100svh',
  margin: '0 auto',
  // backgroundImage: 'url(/src/assets/9x16-edgehill 1.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: 0,
});

const fluoxetine = fontFace({
  src: `url(${fluoxetineURL})`,
})

export const logo = style ([
  hover,
  active,
  {
    textAlign: 'center',
    fontFamily: fluoxetine,
    fontSize: '3rem',
    color: '#ffffff',
    marginTop: vars.margins.medium,
    transition: 'transform 0.1s linear',
    cursor: 'pointer',
  }
])

export const subtitle = style ({
  textAlign: 'center',
  fontSize: vars.fontSize.xxsmall,
  color: '#ffffff',
  marginTop: vars.margins.xsmall,
})

export const houseContainer = style ({
  height: '33svh',
  alignSelf: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: vars.margins.small,
})

export const house = style ({
  width: '80vw',
  maxWidth: '60vh',
  zIndex: 0,
  imageRendering: 'pixelated',
})

export const footerLogo = style([
  hover,
  active,
  {
    width: '40vw',
    maxWidth: '30vh',
    marginBottom: vars.margins.xxsmall,
  }
])
