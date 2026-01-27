import { hover, active, vars } from '@/styles/theme.css'
import { base, button } from '@/components/Button/Button.css'
import { style, keyframes, styleVariants } from '@vanilla-extract/css'

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
  marginTop: vars.margins.large,
  visibility: 'hidden',
  opacity: 0,
  transition: 'visibility 0.5s linear, opacity 0.5s linear',
})

export const characterSelect = style({
  width: '90vw',
  maxWidth: '30svh',
  marginTop: vars.margins.large,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const characters = style({
  width: 300,
  maxWidth: '40svh',
  display: 'flex',
  justifyContent: 'space-between',
})

const spriteScale = style({
  imageRendering: 'pixelated',
})
export const sprite = styleVariants({
  left: [
    spriteScale,
    {
      width: 60,
      objectViewBox: 'xywh(10px 1px 30px 41px)',
    }
  ],
  center: [
    spriteScale,
    {
      width: 58,
      objectViewBox: 'xywh(66px 1px 29px 41px)',
    }
  ],
  right: [
    spriteScale,
    {
      width: 60,
      objectViewBox: 'xywh(120px 1px 30px 41px)',
    }
  ]
})

export const continueText = style([
  button.gold,
  {
    textAlign: 'center',
    animation: `${pulse} 1.5s linear infinite`,
  }
])