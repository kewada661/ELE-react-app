import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css'
import { button } from '@/components/Button/Button.css';

export const loginFallback = style({
  width: 300,
  position: 'relative',
  top: '30%',
  justifyItems: 'center',
  alignSelf: 'center',
  fontSize: vars.fontSize.small,
  '> input': {
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
  }
])

