/** @jsxImportSource @emotion/react */
import React from 'react';

import { withTheme } from '@emotion/react';
import { Theme, useTheme } from '@themes/ThemeProvider';
import { ThemeSizeOptions, baseTheme } from '@themes/base.theme';

export type HeadingProps = {
  children?: React.ReactNode;
  color?: string;
  size?: ThemeSizeOptions;
  className?: string;
  theme?: Theme;
};

const Heading: React.FC<HeadingProps> = (props) => {
  const { children, className, theme, color, size } = props;
  const _theme = useTheme();
  const style = () => {
    return {
      fontSize: size ? baseTheme.headingSizes[size] : 'md',
      color: _theme === color ?? 'light' ? theme.colors.primary.light : theme.colors.primary.dark,
    };
  };
  return (
    <span css={style} className={className}>
      {children}
    </span>
  );
};

export default withTheme(Heading);
