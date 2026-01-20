import { hover, active, vars } from '@/styles/theme.css'
import { base } from '@/components/Button/Button.css'
import { style, keyframes } from '@vanilla-extract/css'

export const storyContainer = style({
  width: '100vw',
  maxWidth: '100svh',
  height: '100svh',
  alignSelf: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'fixed',
  margin: '0 auto',
  top: '0',
  zIndex: 1,
  background: '#000000c4',
})

export const storyText = style({
  marginTop: `calc(${vars.margins.xlarge} * 1.5)`,
  textAlign: 'center',
  maxWidth: '80vw',
})

export const pulse  = keyframes({
  '0%': {
    opacity: 1
  },
  '50%': {
    opacity: 0.5
  },
  '100%': {
    opacity: 1
  }
})

export const continueContainer = style({
  marginTop: vars.margins.xxlarge,
  visibility: 'hidden',
  opacity: 0,
  transition: 'visibility 0.5s linear, opacity 0.5s linear',
  cursor: 'pointer',
})

export const continueText = style([
  base,
  {
    animation: `${pulse} 1.5s linear infinite`,
  }
])