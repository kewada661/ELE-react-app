import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const leaderboardContainer = style({
  height: '80vh',
  width: '80vw',
  maxWidth: '80vh',
  position: 'fixed',
  top: '10vh',
  zIndex: 2,
  background: vars.color.green,
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'center',
  justifySelf: 'center',
  alignSelf: 'center',
  overflowY: 'scroll',
  overflowX: 'hidden',
  scrollbarColor: 'gray transparent',
  fontFamily: 'fluoxetine, monospace',
});

export const leaderboardHeader = style ({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'sticky',
  top: 0,
  background: vars.color.green,
  padding: '1em 1em 0 1em',
})

export const leaderboard = style({
  textAlign: 'center',
});

export const thStyle = style({
  position: 'sticky',
  top: 0,
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
