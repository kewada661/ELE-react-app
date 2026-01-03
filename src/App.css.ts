import { style } from '@vanilla-extract/css';
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

export const house = style ({
  width: '75vw',
  maxWidth: '60vh',
  position: 'relative',
  top: '25%',
  zIndex: 1,
  alignSelf: 'center',
})

export const screenDisclaimer = style({
  textAlign: 'center',
  fontSize: vars.fontSize.xlarge,
  marginTop: vars.spacing.xxlarge,
});
