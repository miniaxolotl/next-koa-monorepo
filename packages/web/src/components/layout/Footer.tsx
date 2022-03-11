import React from 'react';

import { NextPage } from 'next';
import styled from '@emotion/styled';

import { withTheme } from '@emotion/react';
import { Box, BoxProps, BoxStyle, Span } from '@components/core';

type FooterStyle = BoxStyle & {
  // nothing
};

export type FooterProps = BoxProps & {
  subText?: string;
  style?: Partial<FooterStyle>;
};

const Footer_: NextPage<FooterProps> = ({ children, css, as, theme, style, subText }: FooterProps) => {
  const Footer = styled(Box)<FooterProps>(() => ({}));
  return (
    <Footer as={as ?? 'div'} className="mx-8 py-4 text-center" css={css} style={style} theme={theme}>
      <Box className="flex flex-col justify-between">
        {children && (
          <Box>
            <Span className="basis-1/2" style={{ size: 'sm' }}>
              {children}
            </Span>
          </Box>
        )}
        {subText && (
          <Box>
            <Span className="basis-1/2" style={{ size: 'xs' }}>
              {subText}
            </Span>
          </Box>
        )}
      </Box>
    </Footer>
  );
};

export const Footer = withTheme(Footer_);
