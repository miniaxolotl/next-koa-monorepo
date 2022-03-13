import { forwardRef } from 'react';

import styled from '@emotion/styled';
import { withTheme } from '@emotion/react';

import { Box, BoxProps, BoxStyle } from './Box';

export type TextStyle = BoxStyle & {
  // nothing
};

export type TextProps = BoxProps & {
  style?: Partial<TextStyle>;
};

const TextElement = (props: TextProps, ref: React.Ref<HTMLBaseElement>) => {
  const { children, className, css, as, theme, style } = props;
  const Text = styled(Box)<TextProps>(() => ({
    flexBasis: 0,
  }));
  return (
    <Text
      {...props}
      {...{
        ref,
        as: as ?? 'p',
        className,
        css,
        style,
        theme,
      }}
    >
      {children}
    </Text>
  );
};

export const Text = withTheme(forwardRef(TextElement));
