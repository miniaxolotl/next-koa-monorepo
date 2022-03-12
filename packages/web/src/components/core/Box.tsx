import React from 'react';

import { omit } from 'lodash';
import styled from '@emotion/styled';
import { uuid } from '@libs/utility';
import { withTheme } from '@emotion/react';

import { Theme } from '@themes/ThemeProvider';
import { ThemeSizeOptions, ThemeSizeOptionsExpanded } from '@themes/base.theme';

export type BoxStyle = {
  align: 'left' | 'center' | 'right';
  justify: 'start' | 'center' | 'end';
  mx: number;
  my: number;
  py: number;
  px: number;
  text: 'left' | 'center' | 'right';
  color: string;
  backgroundColor: string;
  size: ThemeSizeOptionsExpanded;
  borderWidth: number;
  borderRadius: ThemeSizeOptions;
  borderColor: ThemeSizeOptions;
  variant?: 'solid' | 'outlined' | 'ghost';
};

export type BoxProps = {
  key?: string | number;
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  css?: React.CSSProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: Theme;
  style?: Partial<BoxStyle>;
  onChange?: (event: React.ChangeEvent<HTMLBaseElement>) => void;
  onClick?: (event: React.SyntheticEvent<HTMLBaseElement, MouseEvent>) => void;
};

const BoxElement = (
  props: BoxProps & {
    onChange?: (event: React.ChangeEvent<HTMLBaseElement>) => void;
    onClick?: (event: React.SyntheticEvent<HTMLBaseElement, MouseEvent>) => void;
  },
  ref: React.Ref<HTMLElement>,
) => {
  const { key, children, className, css, as, theme, style } = props;
  const Box = styled.base<
    Omit<BoxProps, 'style' | 'theme'> & {
      style?: React.CSSProperties;
    }
  >(() => ({
    flexBasis: '100%',

    alignItems: style?.align ?? null,
    justifyContent: style?.justify ?? null,

    marginLeft: style?.mx ?? theme.space[style?.mx] ?? null,
    marginRight: style?.mx ?? theme.space[style?.mx] ?? null,
    marginTop: style?.my ?? theme.space[style?.my] ?? null,
    marginBottom: style?.my ?? theme.space[style?.my] ?? null,

    paddingLeft: style?.px ?? theme.space[style?.px] ?? null,
    paddingRight: style?.px ?? theme.space[style?.px] ?? null,
    paddingTop: style?.py ?? theme.space[style?.py] ?? null,
    paddingBottom: style?.py ?? theme.space[style?.py] ?? null,

    borderWidth: style?.borderWidth ?? null,
    borderRadius: theme.radius[style?.borderRadius] ?? null,
    borderColor:
      style?.borderColor ?? style?.backgroundColor ?? style?.variant === 'ghost' ? null : theme.colors.primary.base,

    textAlign: style?.text ?? null,
    backgroundColor: style?.backgroundColor ?? style?.variant === 'solid' ? theme.colors.primary.base : 'transparent',

    color: style?.color ? style.color : style?.variant === 'solid' ? theme.colors.bg.base : theme.colors.primary.base,
    fontSize: theme.fontSizes[style?.size] ?? theme.fontSizes['md'],

    '> *': {
      color: style?.color ? style.color : style?.variant === 'solid' ? theme.colors.bg.base : theme.colors.primary.base,
      fontSize: theme.fontSizes[style?.size] ?? theme.fontSizes['md'],
    },
  }));
  return (
    <Box
      {...omit(props, 'theme')}
      {...{
        ref: ref as React.Ref<HTMLBaseElement>,
        key: key ?? uuid(),
        as: as ?? 'div',
        className,
        style: css,
      }}
    >
      {children}
    </Box>
  );
};

export const Box = withTheme(React.forwardRef(BoxElement));
