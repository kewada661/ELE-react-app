import { style, styleVariants } from '@vanilla-extract/css';
import { focus, active, hover, vars } from '@/styles/theme.css';

export const base = style([
  focus,
  hover,
  active,
  {
    padding: `${vars.spacing.small} ${vars.spacing.small}`,
    margin: `${vars.spacing.medium} ${vars.spacing.medium}`,
    border: 'none',
    color: vars.color.light.secondary,
    fontSize: vars.fontSize.xsmall,
    letterSpacing: '0.1em',
    fontWeight: 'bold',
    borderRadius: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.spacing.xsmall,
    // ':active': {
    //   transform: 'scale(0.95)',
    // },
    transition: 'transform 0.1s linear',
    cursor: 'pointer',
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
      fontSize: vars.fontSize.xxsmall,
    }
  ],
  spotify: [
    base,
    { 
      display: 'flex',
      background: vars.color.accent.cold.main,
      width: '80vw',
      height: '15vw',
      maxWidth: 290,
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

export const circularButton = style([
  hover,
  active,
  {
    display: 'flex',
    alignItems: 'center',
    padding: `${vars.spacing.small} ${vars.spacing.small}`,
    borderRadius: '50%',
    background: vars.color.gold,
    transition: 'transform 0.1s linear',
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
  }
])