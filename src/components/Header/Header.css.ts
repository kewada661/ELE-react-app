import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  alignSelf: 'end',
  maxWidth: '100vh',
  margin: vars.spacing.small,
  position: 'fixed',
  top: 0,
  zIndex: 2,
})

export const headerButton = style({
  color: 'transparent',
  background: 'none',
  border: 'none',
  padding: '.25em'
})

