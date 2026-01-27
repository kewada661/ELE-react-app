import { hoverMore, activeMore, vars } from '@/styles/theme.css'
import { button } from '@/components/Button/Button.css'
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
  marginBottom: vars.margins.large,
  textAlign: 'center',
  maxWidth: '80vw',
})

const base = style({
  display: 'flex',
  alignItems: 'center',
  width: '90vw',
  maxWidth: '30svh',
  paddingLeft: 14,
  paddingRight: 14,
})
export const chevron = styleVariants({
  left: [
    {
      justifyContent: 'left',
    },
    base
  ],

  center: [
    {
      justifyContent: 'center',
    },
    base
  ],

  right: [
    {
      justifyContent: 'right',
    },
    base
  ],
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
  aidan: [
    spriteScale,
    {
      width: 60,
      objectViewBox: 'xywh(10px 1px 30px 41px)',
    }
  ],
  jake: [
    spriteScale,
    {
      width: 58,
      objectViewBox: 'xywh(66px 1px 29px 41px)',
    }
  ],
  chris: [
    spriteScale,
    {
      width: 60,
      objectViewBox: 'xywh(120px 1px 30px 41px)',
    }
  ]
})

export const buttonDiv = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const selectButton = style([
  hoverMore,
  activeMore,
])

export const continueText = style([
  button.gold,
  {
    textAlign: 'center',
    animation: `${pulse} 1.5s linear infinite`,
  }
])