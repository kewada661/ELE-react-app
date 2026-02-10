import { style, styleVariants, fontFace, keyframes } from "@vanilla-extract/css"
import { hover, active, vars } from "@/styles/theme.css"
import { base, circularButton as circularButtonBase } from "@/components/Button/Button.css"
import fluoxetineURL from '@/assets/font/fluoxetine/Fluox___.ttf'

const fluoxetine = fontFace({
  src: `url(${fluoxetineURL})`,
})

export const headerLogo = style([
  hover,
  active,
  {
    fontFamily: fluoxetine,
    fontSize: vars.fontSize.large,
    padding: vars.spacing.medium,
  }
])

export const menu = styleVariants ({
  main: {
    height: '100svh',
    maxWidth: '100svh',
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing.xsmall,
    alignItems: 'center',
    zIndex: 1,
  },
  gameover: {
    width: '80vw',
    maxWidth: '60svh',
    height: '100svh',
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing.xsmall,
  },
  share: {
    width: '80vw',
    maxWidth: '60svh',
    height: '100svh',
    display: 'flex',
    flexDirection: 'column',
    '> p': {
      textAlign: 'center',
      fontSize: vars.fontSize.small,
      fontWeight: 'bold',
      margin: vars.spacing.medium
    },
    '> div': {
      textAlign: 'center',
    }
  }
})

export const yourScore = style({
  textAlign: 'center',
  marginTop: vars.spacing.large,
  '> h1': {
      fontSize: vars.fontSize.xxlarge,
      color: 'white',
  },
})

export const scoreContainer = style({
  width: '80vw',
  maxWidth: '60svh', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: `${vars.spacing.xlarge} 0 0 0`,
  '> h3': {
    fontSize: '5rem',
    position: 'absolute',
    color: 'white',
    padding: `${vars.spacing.small}`,
    justifySelf: 'center',
    // alignSelf: 'center',
  } 
})

export const houseFilter = style({
  width: '80vw',
  maxWidth: '60svh', 
  aspectRatio: '7/4',
  display: 'flex',
  justifySelf: 'center',
  background: "#000000bb",
  border: "solid #ffffff",
  borderWidth: '2px',
  borderRadius: `${vars.spacing.large}`,
})

export const house = style({
  width: '65vw',
  maxWidth: '45vh',
  position: 'absolute',
  display: 'flex',
  justifySelf: 'center',
  margin: 'auto 0',
  opacity: 0.5,
  imageRendering: 'pixelated',
})

const buttonBase = style([
  base,
  {
    margin: `0 ${vars.spacing.xxsmall}`,
  }
])
export const button = styleVariants({
  submit: [
    buttonBase,
    {
      background: vars.color.gold,
    }
  ],
  playAgain: [
    buttonBase,
    {
      background: vars.color.green
    }
  ],
  share: [
    buttonBase,
    {
      background: vars.color.beige,
      width: '100%',
    }
  ],
  playlist: [
    buttonBase,
    {
      background: 'none',
      border: 'solid',
      borderRadius: '0.5rem',
      borderColor: '#ffffff',
    }
  ],
  goBack: [
    buttonBase,
    {
      background: 'none',
    }
  ]
})

export const shareLeaderboard = style({
  display: 'flex',
  justifyContent: 'space-between',
})

export const shareOptions = style({
  width: '80vw',
  maxWidth: '60vh',
  display: 'flex',
  justifyContent: "space-between",
})

export const shareButtonContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
})

export const circularButton = style([
  circularButtonBase,
  {
    background: vars.color.green,
  }
])

export const pulse  = keyframes({
  '0%': {
    opacity: 0
  },
  '25%': {
    opacity: 1
  },
  '75%': {
    opacity: 1
  },
  '100%': {
    opacity: 0
  }
})

export const copiedMessage = style({
  position: 'absolute',
  top: -30,
  opacity: 0,
})

export const copiedAnimation = style({
  animation: `${pulse} .75s linear`,
})

export const shareImage = style({
  display: 'none',
  imageRendering: 'pixelated',
})

export const canvas = style({
  display: 'none',
})