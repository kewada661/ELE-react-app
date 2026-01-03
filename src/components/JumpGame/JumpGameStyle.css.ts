import { style } from "@vanilla-extract/css"
import { vars } from "@/styles/theme.css"

export const container = style({
	width: '100vw',
  maxWidth: '100vh',
	position: 'relative',
	margin: '20px auto 0', 
	overflow: 'hidden',
})

export const canvas = style({
  width: '100vw',
  maxWidth: '100vh',
  background: 'transparent',
  margin: "0 auto",	
	display: 'block',
})

export const scoreBoard = style({
  minWidth: '20vw',
  position: 'fixed',
  top: '0',
  display: 'flex',
  justifySelf: 'center',
  justifyContent: 'center',
  margin: `${vars.spacing.medium}`,
  padding: `${vars.spacing.xsmall}`,
  background: '#000000bb',
  border: "solid #ffffff 1px",
  // borderColor: '#ffffff',
  borderRadius: `${vars.spacing.medium}`,
  '> p': {
    textAlign: 'center',
    display: 'flex',
    justifySelf: 'center',
  },
})

export const controls = style({
  width: '80vw',
  maxWidth: '50vh',
  position: 'relative',
  justifySelf: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  margin: `${vars.spacing.medium}`,
})

export const sprite = style({
  display: "none",
})
