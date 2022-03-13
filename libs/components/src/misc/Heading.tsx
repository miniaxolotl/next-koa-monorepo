// TODO: Add forwardRef
import styled from '@emotion/styled';
import { withTheme } from '@emotion/react';

import { Box, BoxProps, BoxStyle } from '../core';

type HeadingStyle = BoxStyle & {
  // nothing
};

export type HeadingProps = BoxProps & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  style?: Partial<HeadingStyle>;
};

const Heading_ = ({ children, className, css, as, theme, style }: HeadingProps) => {
  const Heading = styled(Box)<HeadingProps>(({ theme }) => ({
    fontFamily: `'Secular One', sans-serif`,
    fontSize: style?.size ? theme.fontSizes[style.size] : theme.fontSizes['xs'],
  }));
  return (
    <Heading
      {...{
        as: as ?? 'h1',
        className: `mb-4${className ? ' ' + className : ''}`,
        css,
        style,
        theme,
      }}
    >
      {children}
    </Heading>
  );
};

export const Heading = withTheme(Heading_);
