import { fontFace, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import fluoxetineURL from '@/assets/font/fluoxetine/Fluox___.ttf'

export const mainContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '100vh',
  height: '100vh',
  maxHeight: '100svh',
  margin: '0 auto',
  backgroundImage: 'url(/src/assets/9x16-edgehill 1.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: 0,
});

export const startButtonContainer = style({
  width: '80vw',
  maxWidth: '80vh',
  display: 'flex',
  position: 'absolute',
  bottom: vars.spacing.xxlarge,
  justifyContent: 'center',
  '> button': {
    fontSize: vars.fontSize.small,
  }
})

const fluoxetine = fontFace({
  src: `url(${fluoxetineURL})`,
})

export const logo = style ({
  textAlign: 'center',
  fontFamily: fluoxetine,
  fontSize: '3rem',
  color: '#ffffff',
  marginTop: vars.spacing.xxlarge,
})

export const subtitle = style ({
  textAlign: 'center',
  fontFamily: 'assistant',
  fontSize: vars.fontSize.xxsmall,
  color: '#ffffff',
  marginTop: vars.spacing.large,
})

export const house = style ({
  width: '80vw',
  maxWidth: '60vh',
  alignSelf: 'center',
  marginTop: vars.spacing.xxlarge
})

export const footerLogo = style({
  width: '20vw',
  maxWidth: '15vh',
  position: 'absolute',
  bottom: vars.spacing.small,
})
