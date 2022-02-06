/** @jsxImportSource @emotion/react */
import React from 'react';

import { Theme, useTheme } from '@themes/ThemeProvider';
import { BackgroundColors } from '@libs/components';
import { withTheme } from '@emotion/react';

export type ButtonProps = {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: string;
  appearance?: 'default' | 'minimal';
  className?: string;
  theme?: Theme;
};

const Button = (props: ButtonProps) => {
  const { children, onClick, color, appearance, className, theme } = props;
  const _theme = useTheme();
  const style = () => {
    return {
      backgroundColor:
        appearance === 'minimal' ? 'none' : _theme === 'light' ? theme.colors.brand.base : theme.colors.brand.dark,
      color: theme.colors.alt.base,
    };
  };
  return (
    <button
      css={style}
      className={`button flex flex-row items-center ${BackgroundColors[color]} ${className ?? ''}`}
      onClick={onClick}
    >
      <span className={_theme === 'light' ? 'text-white' : 'text-white'}>{children}</span>
    </button>
  );
};

export default withTheme(Button);
