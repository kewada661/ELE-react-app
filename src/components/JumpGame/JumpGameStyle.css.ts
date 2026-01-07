import { style } from "@vanilla-extract/css"
import { vars } from "@/styles/theme.css"
import { circularButton } from "../Button/Button.css"

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100vw',
  maxWidth: '100vh',
	margin: '20px auto 0', 
	overflow: 'hidden',
})

export const canvas = style({
  width: '100vw',
  maxWidth: '100vh',
  background: 'transparent',
	display: 'block',
})

export const scoreBoard = style({
  minWidth: '20vw',
  position: 'absolute',
  top: vars.spacing.xxsmall,
  display: 'flex',
  justifySelf: 'center',
  justifyContent: 'center',
  margin: vars.spacing.medium,
  padding: vars.spacing.xsmall,
  background: '#000000bb',
  border: "solid #ffffff 1px",
  // borderColor: '#ffffff',
  borderRadius: `${vars.spacing.medium}`,
  '> p': {
    fontFamily: 'assistant',
    fontWeight: '800',
    fontSize: vars.fontSize.xxlarge,
    color: '#ffffff',
    textAlign: 'center',
    display: 'flex',
    justifySelf: 'center',
  },
})

export const controls = style({
  width: '100%',
  justifySelf: 'center',
  display: 'flex',
  justifyContent: 'space-between',
})

export const controlButton = style([
  circularButton,
  {
    background: '#00000086',
    border: 'solid',
    borderWidth: 1,
    borderColor: '#000000',
    margin: vars.spacing.medium,
  }
])

export const sprite = style({
  display: "none",
})
