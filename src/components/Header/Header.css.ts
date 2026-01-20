import { hover, active, vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  gap: vars.spacing.xsmall,
  alignSelf: 'end',
  maxWidth: '100vh',
  margin: vars.spacing.small,
  position: 'fixed',
  top: 0,
  zIndex: 2,
})

export const headerButton = style([
  hover,
  active,
  {
    display: 'flex',
    alignItems: 'center',
    color: 'transparent',
    background: 'none',
    border: 'none',
  }
])

