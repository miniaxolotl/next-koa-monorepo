import React from 'react';

import styled from '@emotion/styled';
import { withTheme } from '@emotion/react';

import { Span, SpanProps, SpanStyle } from '@libs/components';

type ButtonStyle = SpanStyle & {
  // colorScheme?: string;
};

export type ButtonProps = SpanProps & {
  style?: Partial<ButtonStyle>;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button_ = (
  { children, className, css, as, theme, style, href, type }: ButtonProps,
  ref: React.Ref<HTMLBaseElement>,
) => {
  const Button = styled(Span)<ButtonProps>(({ theme, style }) => ({
    paddingLeft: style?.px ?? theme.space[style?.px] ?? theme.space['md'],
    paddingRight: style?.px ?? theme.space[style?.px] ?? theme.space['md'],
    paddingTop: style?.py ?? theme.space[style?.py] ?? theme.space['sm'],
    paddingBottom: style?.py ?? theme.space[style?.py] ?? theme.space['sm'],

    borderWidth: style?.borderWidth ?? style?.variant === 'ghost' ? null : 1,
    borderRadius: theme.radius[style?.borderRadius] ?? theme.radius['md'],
    // borderColor: style?.borderColor ?? theme.colors.primary.base,

    ':hover': {
      filter: 'opacity(0.85)',
    },
  }));
  return (
    <Button
      {...{
        ref,
        as: as ?? 'button',
        className,
        css,
        style,
        theme,
        href,
        type: type ?? 'button',
      }}
    >
      {children}
    </Button>
  );
};

export const Button = withTheme(React.forwardRef(Button_));
