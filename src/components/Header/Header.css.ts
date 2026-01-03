import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  alignSelf: 'end',
  maxWidth: '100vh',
  margin: '1em 1em 1em 1em',
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

