import { vars } from '@/styles/theme.css';
import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  margin: 0,
  padding: 0,
});

globalStyle('#root', {
  maxHeight: '100svh',
  // overflow: 'hidden',
  fontFamily: '\"Jersey 10\", sans-serif',
  letterSpacing: '0.1em',
  fontSize: '2vh',
})

globalStyle('body', {
  background: vars.color.dark.main,
  color: vars.color.light.secondary,
  lineHeight: '170%',
  maxHeight: '100vh',
});

globalStyle('button', {
  background: 'none',
  border: 'transparent',
});
