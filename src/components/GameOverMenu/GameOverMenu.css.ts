import { style, styleVariants} from "@vanilla-extract/css"
import { vars } from "@/styles/theme.css"

export const menu = styleVariants ({
  main: {
    position: 'relative',
    top: '10%',
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing.xsmall,
    alignItems: 'center',
    zIndex: 1, 
  },
  gameover: {
    width: '80vw',
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing.xsmall,
  },
  share: {
    width: '80vw',
    display: 'flex',
    flexDirection: 'column',
    '> p': {
      textAlign: 'center',
      fontSize: vars.fontSize.small,
      fontWeight: 'bold',
      margin: `${vars.spacing.large} 0`
    },
    '> div': {
      textAlign: 'center',
    }
  }
})

export const yourScore = style({
  textAlign: 'center',
  '> h1': {
      fontSize: vars.fontSize.xxlarge,
      color: 'white',
  },
})

export const scoreContainer = style({
  width: '80vw',
  maxWidth: '60vh', 
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
  maxWidth: '50vh', 
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
})

const buttonBase = style({
  padding: `${vars.spacing.small} ${vars.spacing.small}`,
  margin: `0 ${vars.spacing.xxsmall}`,
  border: 'none',
  color: vars.color.light.secondary,
  fontFamily: 'assistant',
  fontWeight: 'bold',
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
      position: "relative",
      top: '15%',
    }
  ]
})

export const shareLeaderboard = style({
  display: 'flex',
  justifyContent: 'space-between',
})

export const shareOptions = style({
  width: '80vw',
  display: 'flex',
  justifyContent: "space-between",
})

export const circularButton = style({
  padding: `${vars.spacing.medium} ${vars.spacing.medium}`,
  // margin: `0 ${vars.spacing.xxsmall}`,
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