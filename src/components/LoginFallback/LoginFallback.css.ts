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
  zIndex: 1,
})

export const errorMessage = style({
  marginTop: vars.spacing.xsmall,
  opacity: 0,
})

export const input = style({
  width: '100%',
  maxWidth: '50vh',
  padding: vars.spacing.xsmall,
  borderRadius: vars.spacing.xxsmall,
  border: 'none',
  margin: `${vars.spacing.xxsmall} 0`,
  display: 'flex',
  justifySelf: 'center',
  fontSize: 20,
})

export const submitButton = style([
  button.green,
  {
    fontSize: vars.fontSize.small,
    alignSelf: 'center',
  }
])

