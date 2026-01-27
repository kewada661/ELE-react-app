import { style } from '@vanilla-extract/css';
import { vars, hover, active } from '@/styles/theme.css';

export const container = style({
  width: '100vw',
  maxWidth: '100svh',
  height: '100svh',
  display: 'flex',
  justifyContent: 'center',
  padding: vars.spacing.xxlarge,
  position: 'fixed',
  top: 0,
  zIndex: 2,
})
export const leaderboardContainer = style({
  height: '90%',
  width: 580,
  zIndex: 2,
  marginTop: vars.spacing.large,
  background: vars.color.green,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: vars.spacing.medium,
});

export const leaderboardHeader = style ({
  width: '100%',
  display: 'flex',
  justifyContent: 'end',
  position: 'sticky',
  top: 0,
  background: vars.color.green,
  padding: vars.spacing.small,
  borderRadius: vars.spacing.medium,
})

export const xButton = style ([
  hover,
  active,
])
export const leaderboard = style({
  display: 'block',
  width: "90%",
  background: vars.color.green,
  tableLayout: 'fixed',
  scrollbarWidth: 'none',
  overflowY: 'scroll',
});

export const thStyle = style({
  position: 'sticky',
  textAlign: 'center',
  top: 0,
  background: vars.color.green,
})

export const hScore = style([
  thStyle,
  {
    width: '10%',
  }
])

export const hName = style([
  thStyle,
  {
    width: '80%',
  }
])


export const tbodyStyle = style({
  width: "100%",
})

export const trStyle = style({
  width: '100%',
})

const tdStyle = style({
  padding: '0.15em',
  maxWidth: 0,
  whiteSpace: 'nowrap',
});

export const name = style([
  tdStyle,
  {
    width: '76%',
    textAlign: "left",
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
])

export const score = style([
  tdStyle,
  {
    textAlign: "right",
    width: '12%',
    padding: '0.3em',
  }
])
