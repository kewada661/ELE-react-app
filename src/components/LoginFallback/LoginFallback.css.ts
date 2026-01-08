import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css'
import { button } from '@/components/Button/Button.css';

export const loginFallback = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100vw',
  maxWidth: '100vh',
  height: '40svh',
  alignSelf: 'center',
  fontSize: vars.fontSize.small,
  '> input': {
    width: '100%',
    maxWidth: '50vh',
    padding: vars.spacing.xsmall,
    borderRadius: vars.spacing.xxsmall,
    border: 'none',
    margin: `${vars.spacing.xxsmall} 0`,
    display: 'flex',
    justifySelf: 'center',
  }
})

export const submitButton = style([
  button.green,
  {
    fontSize: vars.fontSize.small,
    alignSelf: 'center',
  }
])

