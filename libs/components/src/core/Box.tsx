import { forwardRef } from 'react';

import { omit } from 'lodash';
import styled from '@emotion/styled';
import { uuid } from '@libs/utility';
import { withTheme } from '@emotion/react';

import { Theme, ThemeSizeOptions, ThemeSizeOptionsExpanded } from '@libs/themes';
// import { ThemeSizeOptions, ThemeSizeOptionsExpanded } from '@themes/base.theme';

export type BoxStyle = {
  align: 'left' | 'center' | 'right';
  justify: 'start' | 'center' | 'end';
  mx: number | string;
  my: number | string;
  py: number | string;
  px: number | string;
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

    alignItems: style?.align ?? undefined,
    justifyContent: style?.justify ?? undefined,

    marginLeft: style?.mx ? theme.space[style.mx] : undefined,
    marginRight: style?.mx ? theme.space[style?.mx] : undefined,
    marginTop: style?.my ? theme.space[style?.my] : undefined,
    marginBottom: style?.my ? theme.space[style?.my] : undefined,

    paddingLeft: style?.px ? theme.space[style.px] : undefined,
    paddingRight: style?.px ? theme.space[style?.px] : undefined,
    paddingTop: style?.py ? theme.space[style?.py] : undefined,
    paddingBottom: style?.py ? theme.space[style?.py] : undefined,

    borderWidth: style?.borderWidth ? style?.borderWidth : undefined,
    borderRadius: style?.borderRadius ? theme.radius[style?.borderRadius] : undefined,
    borderColor:
      style?.borderColor ?? style?.backgroundColor ?? style?.variant === 'ghost'
        ? undefined
        : theme.colors.primary.base,

    textAlign: style?.text ?? undefined,
    backgroundColor: style?.backgroundColor ?? style?.variant === 'solid' ? theme.colors.primary.base : 'transparent',

    color: style?.color ? style.color : style?.variant === 'solid' ? theme.colors.bg.base : theme.colors.primary.base,
    fontSize: style?.size ? theme.fontSizes[style.size] : theme.fontSizes['md'],

    '> *': {
      color: style?.color ? style.color : style?.variant === 'solid' ? theme.colors.bg.base : theme.colors.primary.base,
      fontSize: style?.size ? theme.fontSizes[style.size] : theme.fontSizes['md'],
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

export const Box = withTheme(forwardRef(BoxElement));
