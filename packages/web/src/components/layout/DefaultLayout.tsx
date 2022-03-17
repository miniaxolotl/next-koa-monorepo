import styled from '@emotion/styled';

import { FiHeart } from 'react-icons/fi';
import { Footer } from './Footer';
import Link from 'next/link';
import React from 'react';
import { withTheme } from '@emotion/react';

import { NavigationBar } from '@components/navigation';
import { Anchor, Box, BoxProps, BoxStyle } from '@libs/components';

type DefaultLayoutStyle = BoxStyle & {
  // nothing
};

export type DefaultLayoutProps = BoxProps & {
  style?: Partial<DefaultLayoutStyle>;
};

const DefaultLayoutElement = ({ children, className, css, as, theme, style }: DefaultLayoutProps) => {
  const DefaultLayout = styled(Box)<DefaultLayoutProps>(() => ({}));
  const GithubLink = 'https://github.com/theluckyegg/next-koa-monorepo';
  const year = new Date().getUTCFullYear();
  const creation = 2022;
  return (
    <DefaultLayout
      as={as ?? 'div'}
      className={`flex flex-col min-h-screen py-4${className ? ` ${className}` : ''}`}
      css={css}
      style={style}
      theme={theme}
    >
      <NavigationBar title="next-koa-monorepo" />
      <Box className="flex flex-col grow basis-full items-stretch mx-8 pt-16 md:mx-auto md:w-2/3">{children}</Box>
      <Footer subText={`next-koa-monorepo © 2022${year > creation ? '-' + year : ''}`}>
        Developed with <FiHeart className="inline" /> by Elias Mawa {'-'}{' '}
        <Link href={GithubLink} passHref>
          <Anchor className="whitespace-nowrap" href={GithubLink}>
            Github
          </Anchor>
        </Link>
      </Footer>
    </DefaultLayout>
  );
};

export const DefaultLayout = withTheme(DefaultLayoutElement);
