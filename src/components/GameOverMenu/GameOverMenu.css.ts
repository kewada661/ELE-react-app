import { style, styleVariants} from "@vanilla-extract/css"
import { vars } from "@/styles/theme.css"

export const menu = styleVariants ({
  gameover: {
    margin: "auto",
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing.xsmall,
    alignItems: 'center',
    zIndex: 1,
    '> h1': {
      fontSize: vars.fontSize.large,
      color: 'white',
    }, 
  },
  main: {

  }
})

export const scoreContainer = style({
  width: '80vw',
  maxWidth: '60vh', 
  height: '30vh',
  // position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '> h3': {
    fontSize: vars.fontSize.xxlarge,
    position: 'absolute',
    color: 'white',
    padding: `${vars.spacing.medium}`,
    justifySelf: 'center',
    // alignSelf: 'center',
  } 
})

export const houseFilter = style({
  position: 'absolute',
  width: '80vw',
  maxWidth: '50vh', 
  aspectRatio: '7/4',
  display: 'flex',
  justifySelf: 'center',
  background: "#000000bb",
  border: "solid #ffffff",
  borderRadius: `${vars.spacing.large}`,
})

export const house = style({
  width: '70vw',
  maxWidth: '45vh',
  position: 'absolute',
  display: 'flex',
  justifySelf: 'center',
  margin: 'auto 0',
  zIndex: -1,
})

const buttonBase = style({
  padding: `${vars.spacing.small} ${vars.spacing.small}`,
  margin: `0 ${vars.spacing.xxsmall}`,
  border: 'none',
  color: vars.color.light.secondary,
  fontSize: vars.fontSize.small,
  borderRadius: '0.25rem',
})
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
      background: vars.color.beige
    }
  ],
  playlist: [
    buttonBase,
    {
      background: 'none',
      border: 1,
      borderColor: vars.color.light.main,
    }
  ],
})

export const circularButton = style({
  padding: `${vars.spacing.small} ${vars.spacing.small}`,
  margin: `0 ${vars.spacing.xxsmall}`,
  borderRadius: '50%',
  background: vars.color.green,
  '> svg': {
    '> path': {
      strokeWidth: "1",
    },
    '> g': {
      '> path': {
        strokeWidth: "1",
      },
    },
  },
})