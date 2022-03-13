import { forwardRef, useMemo } from 'react';

import styled from '@emotion/styled';
import { withTheme } from '@emotion/react';

import { Box, BoxProps, BoxStyle } from './Box';

export type SpanStyle = BoxStyle & {
  // nothing
};

export type SpanProps = BoxProps & {
  style?: Partial<SpanStyle>;
};

const SpanElement = (props: SpanProps, ref: React.Ref<HTMLBaseElement>) => {
  const { children, className, css, as, theme, style } = props;
  const ISpan = useMemo(
    () =>
      styled(Box)<SpanProps>(() => ({
        flexBasis: 0,
      })),
    [],
  );
  return (
    <ISpan
      {...props}
      {...{
        ref,
        as: as ?? 'span',
        className,
        css,
        style,
        theme,
      }}
    >
      {children}
    </ISpan>
  );
};

export const Span = withTheme(forwardRef(SpanElement));
