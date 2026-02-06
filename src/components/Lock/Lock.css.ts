import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css'
import { loginFallback } from '@/components/LoginFallback/LoginFallback.css';

export const lock = style([
  loginFallback,
  {
    marginTop: `calc(1.75 * ${vars.margins.xxlarge})`,
  }
])