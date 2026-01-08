import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const container = style({
  width: '100vw',
  maxWidth: '100vh',
  height: '100vh',
  padding: vars.spacing.xxlarge,
  position: 'fixed',
  top: 0,
  zIndex: 2,
})
export const leaderboardContainer = style({
  width: '100%',
  height: '90%',
  zIndex: 2,
  marginTop: vars.spacing.large,
  background: vars.color.green,
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  overflowY: 'visible',
  overflowX: 'hidden',
  scrollbarColor: 'transparent transparent',
  fontFamily: 'assistant, monospace',
  borderRadius: vars.spacing.medium,
});

export const leaderboardHeader = style ({
  captionSide: 'top',
  display: 'flex',
  justifyContent: 'end',
  position: 'sticky',
  top: 0,
  background: vars.color.green,
  margin: vars.spacing.small,
})

export const tableContainer = style({
  height: "95vh",
  width: '100%',
  maxWidth: '60vh',
  overflowY: 'scroll',
  alignSelf: 'center',
  paddingRight: vars.spacing.small,
  paddingLeft: vars.spacing.small,
})
export const leaderboard = style({
  height: "50%",
  background: vars.color.green,
  textAlign: 'center',
});

export const thStyle = style({
  position: 'sticky',
  top: 0,
  background: vars.color.green,
})

export const tbodyStyle = style({
  overflowY: 'scroll',
})

const tdStyle = style({
  textAlign: 'center',
  padding: '0.15em',
});

export const rankName = style([
  tdStyle,
  {
    textAlign: "left",
    width: '75%',
  }
])

export const score = style([
  tdStyle,
  {
    textAlign: "right",
    width: "10%",
    padding: '0.3em',
  }
])
