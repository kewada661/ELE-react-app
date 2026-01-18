import { createGlobalTheme, style } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    dark: {
      main: '#2d3436',
      secondary: '#636e72',
    },
    light: {
      main: '#b2bec3',
      secondary: '#ffffffff',
    },
    gold: '#e1b674',
    green: '#2b3e2c',
    blue: '#6cb4e6',
    beige: '#9c8c7a',
    feedback: {
      warning: {
        main: '#fdcb6e',
        secondary: '#ffeaa7',
      },
      success: {
        main: '#00b894',
        secondary: '#55efc4',
      },
      error: {
        main: '#d63031',
        secondary: '#ff7675',
      },
      info: {
        main: '#0984e3',
        secondary: '#74b9ff',
      },
    },
    accent: {
      cold: {
        main: '#1ed760',
        secondary: '#a29bfe',
      },
      warm: {
        main: '#e84393',
        secondary: '#fd79a8',
      },
    },
  },
  spacing: {
    xxsmall: '0.25em',
    xsmall: '0.5em',
    small: '0.75em',
    medium: '1em',
    large: '1.5em',
    xlarge: '2em',
    xxlarge: '2.5em',
  },
  fontSize: {
    xxsmall: '0.875rem',
    xsmall: '1rem',
    small: '1.125rem',
    medium: '1.25rem',
    large: '1.5rem',
    xlarge: '1.75rem',
    xxlarge: '2rem',
  },
  margins: {
    xxsmall: '1svh',
    xsmall: '3svh',
    small: '5svh',
    medium: '10svh',
    large: '15svh',
    xlarge: '20svh',
    xxlarge: '25svh',
  }
});

export const focus = style({
  ':focus-visible': {
    boxShadow: `0px 0px 1px 3px ${vars.color.accent.cold.main}`,
    outline: 'none',
  },
});


export const hover = style({
':hover': {
    transform: 'scale(1.05)',
  },
})

export const active = style({
':active': {
    transform: 'scale(0.95)',
  },
})


export const elevation = style({
  boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
});
