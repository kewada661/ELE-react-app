import { style, styleVariants } from '@vanilla-extract/css';
import { focus, vars } from '@/styles/theme.css';

const base = style([
  focus,
  {
    padding: `${vars.spacing.small} ${vars.spacing.small}`,
    margin: `${vars.spacing.medium} ${vars.spacing.medium}`,
    border: 'none',
    color: vars.color.light.secondary,
    fontFamily: 'assistant',
    fontSize: vars.fontSize.xxsmall,
    fontWeight: 'bold',
    borderRadius: '0.25rem',
    display: 'flex',
    // ':hover': {
    //   background: vars.color.light.secondary,
    //   color: vars.color.dark.main,
    // },
  }
]);

export const button = styleVariants({
  primary: [
    base,
    { 
      background: 'none',
      display: 'flex',
      ':hover': { background: 'none' },
      fontWeight: 'normal',
    }
  ],
  spotify: [
    base,
    { 
      display: 'flex',
      background: vars.color.accent.cold.main,
      width: '80vw',
      height: '15vw',
      maxWidth: 280,
      maxHeight: 60,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: vars.fontSize.small,
    }
  ],
  gold: [
    base,
    { background: vars.color.gold }
  ],
  green: [
    base,
    { background: vars.color.green }
  ],
  blue: [
    base,
    { background: vars.color.blue }
  ],
});

export const circularButton = style({
  padding: `${vars.spacing.small} ${vars.spacing.small}`,
  aspectRatio: '1/1',
  margin: `0 ${vars.spacing.xxsmall}`,
  borderRadius: '50%',
  background: vars.color.gold,
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