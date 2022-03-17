import React from 'react';

import Link from 'next/link';
import styled from '@emotion/styled';
import { withTheme } from '@emotion/react';
import { FiSearch, FiShoppingBag, FiUser } from 'react-icons/fi';

import { DropDownMenu } from '@components/drop-down-menu';
import { Anchor, Box, BoxProps, BoxStyle, IconButton, Span } from '@libs/components';

type NavigationBarStyle = BoxStyle & {
  // nothing
};

export type NavigationBarProps = Omit<BoxProps, 'children'> & {
  title?: string;
  style?: Partial<NavigationBarStyle>;
};

const NavigationBarMenuNoAuth = [
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register' },
];

const NavigationBarMenuCart = [{ label: 'empty cart!' }];

const NavigationBar_ = ({ className, css, as, theme, style, title }: NavigationBarProps) => {
  const NavigationBar = styled(Box)<NavigationBarProps>(() => ({}));
  // const NavigationBarMenuAuth = [
  //   { label: 'My Account', href: '/my-account' },
  //   {
  //     label: 'Logout',
  //     onClick: () => {
  //       // session.logout();
  //     },
  //   },
  // ];
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
        <IconButton style={{ variant: 'ghost' }}>
          <FiSearch size={theme.fontSizes.xl} />
        </IconButton>
        <DropDownMenu items={NavigationBarMenuCart} width="lg" style={{ text: 'center' }}>
          <IconButton as="div" style={{ variant: 'ghost' }}>
            <FiShoppingBag size={theme.fontSizes.xl} />
          </IconButton>
        </DropDownMenu>
        {/* items={session.state ? NavigationBarMenuAuth : NavigationBarMenuNoAuth} */}
        <DropDownMenu items={NavigationBarMenuNoAuth}>
          <IconButton as="div" style={{ variant: 'ghost' }}>
            <FiUser size={theme.fontSizes.xl} />
            {/* {user.state?.email && <Span style={{ px: 'sm' }}>{user.state?.email}</Span>} */}
          </IconButton>
        </DropDownMenu>
      </Span>
    </NavigationBar>
  );
};

export const NavigationBar = withTheme(NavigationBar_);
