import { fontFace, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const mainContainer = style({
  display: 'flex',
  flexDirection: 'column',
  // justifyContent: 'end',
  maxWidth: '100vh',
  height: '100vh',
  margin: '0 auto',
  backgroundImage: 'url(/src/assets/9x16-edgehill 1.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: 0,
});

export const startButtonContainer = style({
  width: '80vw',
  maxWidth: '80vh',
  position: 'relative',
  top: '70%',
  display: 'flex',
  alignSelf: 'center',
  justifySelf: 'end',
  justifyContent: 'center',
  '> button': {
    fontSize: vars.fontSize.small,
  }
})

const fluoxetine = fontFace({
  src: 'url("src/font/fluoxetine/Fluox___.ttf")',
})

export const logo = style ({
  textAlign: 'center',
  fontFamily: fluoxetine,
  fontSize: '3rem',
  color: '#ffffff',
  position: 'relative',
  top: '16%',
})

export const subtitle = style ({
  textAlign: 'center',
  fontFamily: 'assistant',
  color: '#ffffff',
  position: 'relative',
  top: '18%'
})

export const house = style ({
  width: '80vw',
  maxWidth: '60vh',
  position: 'relative',
  top: '25%',
  zIndex: 1,
  alignSelf: 'center',
})

export const footerLogo = style({
  width: '20vw',
  alignSelf: 'center',
  position: 'fixed',
  bottom: '2vh',
})
