import { style } from "@vanilla-extract/css"
import { vars } from "@/styles/theme.css"
import { circularButton } from "../Button/Button.css"

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100vw',
  maxWidth: '100svh',
	margin: '20px auto 0', 
	overflow: 'hidden',
  WebkitUserSelect: 'none',
  WebkitTouchCallout: 'none',
  userSelect: 'none',
})

export const canvas = style({
  // width: '100vw',
  // maxWidth: '100svh',
  background: 'transparent',
  imageRendering: 'pixelated',
	// display: 'block',
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
    touchAction: 'manipulation',
  }
])

export const footerLogo = style({
  width: '20vw',
  maxWidth: '15vh',
  position: "absolute",
  bottom: vars.margins.xsmall,
  WebkitUserSelect: 'none',
  WebkitTouchCallout: 'none',
  userSelect: 'none',
})

export const sprite = style({
  imageRendering: 'pixelated',
  display: "none",
})
