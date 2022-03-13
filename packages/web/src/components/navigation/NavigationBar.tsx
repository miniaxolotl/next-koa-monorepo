import React from 'react';

import Link from 'next/link';
import styled from '@emotion/styled';
// import { FiMoon, FiSun } from 'react-icons/fi';

import { Anchor, Box, BoxProps, BoxStyle, Button, Span } from '@libs/components';

import { withTheme } from '@emotion/react';

type NavigationBarStyle = BoxStyle & {
  // nothing
};

export type NavigationBarProps = Omit<BoxProps, 'children'> & {
  title?: string;
  style?: Partial<NavigationBarStyle>;
};

const NavigationBar_ = ({ className, css, as, theme, style, title }: NavigationBarProps) => {
  const NavigationBar = styled(Box)<NavigationBarProps>(() => ({}));
  return (
    <NavigationBar
      as={as ?? 'div'}
      className={`flex flex-row ${title ? 'justify-between' : 'justify-around'} items-center mx-8 py-4 `}
      css={css}
      style={style}
      theme={theme}
    >
      {title && (
        <Link href="/" passHref>
          <Anchor className="whitespace-nowrap">{title}</Anchor>
        </Link>
      )}
      <Span className={`flex flex-row space-x-4 items-center${className ? ' ' + className : ''}`}>
        <Span>
          <Link href="/login" passHref>
            <Anchor className="whitespace-nowrap">login</Anchor>
          </Link>
        </Span>
        <Button style={{ variant: 'solid' }}>
          <Link href="/register" passHref>
            <Anchor className="whitespace-nowrap">register</Anchor>
          </Link>
        </Button>
      </Span>
    </NavigationBar>
  );
};

export const NavigationBar = withTheme(NavigationBar_);
