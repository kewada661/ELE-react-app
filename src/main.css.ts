import { vars } from '@/styles/theme.css';
import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  margin: 0,
  padding: 0,
});

globalStyle('#root', {
  maxHeight: '100vh',
  overflow: 'hidden',
})

globalStyle('body', {
  background: vars.color.dark.main,
  color: vars.color.light.main,
  lineHeight: '170%',
  maxHeight: '100vh',
});

globalStyle('button', {
  background: 'none',
  border: 'transparent',
});
