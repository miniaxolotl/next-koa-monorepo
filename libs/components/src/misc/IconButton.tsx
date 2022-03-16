import { forwardRef } from 'react';

import styled from '@emotion/styled';
import { withTheme } from '@emotion/react';

import { Span, SpanProps, SpanStyle } from '../core';

type IconButtonStyle = SpanStyle & {
  // colorScheme?: string;
};

export type IconButtonProps = SpanProps & {
  style?: Partial<IconButtonStyle>;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
};

const IconButton_ = (
  { children, className, css, as, theme, style, href, type }: IconButtonProps,
  ref: React.Ref<HTMLBaseElement>,
) => {
  const IconButton = styled(Span)<IconButtonProps>(({ theme, style }) => ({
    paddingLeft: style?.px ? theme.space[style.px] : theme.space['md'],
    paddingRight: style?.px ? theme.space[style?.px] : theme.space['md'],
    paddingTop: style?.py ? theme.space[style?.py] : theme.space['md'],
    paddingBottom: style?.py ? theme.space[style?.py] : theme.space['md'],

    borderWidth: style?.borderWidth ? style?.borderWidth : style?.variant === 'ghost' ? undefined : 1,
    borderRadius: style?.borderRadius ? theme.radius[style.borderRadius] : theme.radius['md'],
    // borderColor: style?.borderColor ?? theme.colors.primary.base,

    ':hover': {
      filter: 'opacity(0.85)',
    },
  }));
  return (
    <IconButton
      {...{
        ref,
        as: as ?? 'button',
        className: `flex flex-row space-x-8 w-full${className ? ' ' + className : ''}`,
        css,
        style,
        theme,
        href,
        type: type ?? 'button',
      }}
    >
      {children}
    </IconButton>
  );
};

export const IconButton = withTheme(forwardRef(IconButton_));
