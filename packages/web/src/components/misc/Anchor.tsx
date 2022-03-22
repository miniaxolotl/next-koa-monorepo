import React from 'react';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { withTheme } from '@emotion/react';
import { Text, TextProps, TextStyle } from '@libs/components';

type AnchorStyle = TextStyle & {
  // nothing
};

export type AnchorProps = TextProps & {
  style?: Partial<AnchorStyle>;
  href?: string;
};

const Anchor_ = (
  { children, className, css, as, theme, style, href }: AnchorProps,
  ref: React.Ref<HTMLBaseElement>,
) => {
  const router = useRouter();
  const Anchor = styled(Text)<AnchorProps>(() => ({
    color: router.route === href ? theme.colors.alt.dark : null,
    ':hover': {
      filter: router.route === href ? null : 'opacity(0.80)',
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
        href,
      }}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (router.route !== href) router.push(href);
      }}
    >
      {children}
    </Anchor>
  );
};

export const Anchor = withTheme(React.forwardRef(Anchor_));
