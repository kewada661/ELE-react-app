import { style } from '@vanilla-extract/css';

export const loginFallback = style({
  width: 300,
  position: 'relative',
  top: '35%',
  justifyItems: 'center',
  alignSelf: 'center',
  '> input': {
    display: 'flex',
    justifySelf: 'center',
  }
})

