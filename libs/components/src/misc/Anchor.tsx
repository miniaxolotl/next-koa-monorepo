import { forwardRef } from 'react';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { withTheme } from '@emotion/react';
import { Text, TextProps, TextStyle } from '../core';
// import { Text, TextProps, TextStyle } from '@libs/components';

type AnchorStyle = TextStyle & {
  // nothing
};

export type AnchorProps = TextProps & {
  style?: Partial<AnchorStyle>;
  href?: string;
};

const Anchor_ = (
  { children, className, css, as, theme, style, href, onClick }: AnchorProps,
  ref: React.Ref<HTMLBaseElement>,
) => {
  const router = useRouter();
  const Anchor = styled(Text)<AnchorProps>(() => ({
    color: router.route === href ? theme.colors.alt.dark : undefined,
    ':hover': {
      filter: router.route === href ? undefined : 'opacity(0.80)',
    },
  }));
  return (
    <Anchor
      {...{
        ref,
        as: as ?? 'a',
        className,
        css,
        style,
        theme,
        href: href ?? '',
      }}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (href && router.route !== href) router.push(href);
        onClick && onClick(event);
      }}
    >
      {children}
    </Anchor>
  );
};

export const Anchor = withTheme(forwardRef(Anchor_));
