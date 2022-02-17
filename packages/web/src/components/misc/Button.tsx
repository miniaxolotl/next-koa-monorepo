/** @jsxImportSource @emotion/react */
import React from 'react';

import { BackgroundColors } from '@libs/components';
import { withTheme } from '@emotion/react';
import { Theme, useTheme } from '@themes/ThemeProvider';

export type ButtonProps = {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: string;
  appearance?: 'default' | 'minimal';
  className?: string;
  type?: 'button' | 'submit';
  theme?: Theme;
};

const Button = (props: ButtonProps) => {
  const { children, onClick, type, color, appearance, className, theme } = props;
  const t = useTheme();
  const style = () => {
    return {
      backgroundColor:
        appearance === 'minimal' ? 'none' : t === 'light' ? theme.colors.brand.base : theme.colors.brand.dark,
      color: theme.colors.brand.base,
    };
  };
  return (
    <button
      css={style}
      type={type ?? 'button'}
      className={`button flex flex-row items-center ${BackgroundColors[color]} ${className ?? ''}`}
      onClick={onClick}
    >
      <span className={t === 'light' ? 'text-white' : 'text-white'}>{children ?? 'submit'}</span>
    </button>
  );
};

export default withTheme(Button);
