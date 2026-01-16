import { style } from "@vanilla-extract/css"
import { vars } from "@/styles/theme.css"
import { circularButton } from "../Button/Button.css"
import {footerLogo as appFooterLogo} from '@/App.css';

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
  overflowX: 'hidden',
  // overflowY: 'hidden',
})

export const canvas = style({
  position: 'fixed',
  top: 0,
  background: 'transparent',
  imageRendering: 'pixelated',
})

export const scoreBoard = style({
  minWidth: '20vw',
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
  zIndex: 1,
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
  position: 'fixed',
  bottom: vars.spacing.medium,
  width: '100vw',
  maxWidth: '100vh',
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

export const footerLogo = style([
  appFooterLogo,
  {
    position: "fixed",
    marginBottom: 0,
    bottom: vars.margins.xxsmall,
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none',
    userSelect: 'none',
    zIndex: 1,
  }
])

export const sprite = style({
  imageRendering: 'pixelated',
  display: "none",
})
