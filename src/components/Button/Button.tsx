import React from 'react';

export interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className: string;
}

export const Button = ({ onClick, children, className }: ButtonProps) => (
  <button className={className} onClick={onClick}>
    {children ?? 'Click'}
  </button>
);