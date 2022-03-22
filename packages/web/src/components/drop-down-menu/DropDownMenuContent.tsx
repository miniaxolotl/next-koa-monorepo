import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ThemeSizeOptions } from '@libs/themes';
import styled from '@emotion/styled';
import { withTheme } from '@emotion/react';
import { BoxProps, BoxStyle } from '@libs/components';
import React, { forwardRef, useMemo } from 'react';

export type DropDownMenuContentStyle = BoxStyle & {
  // nothing
};

type DropDownMenuContentProps = BoxProps & {
  children?: React.ReactNode;
  onMouseLeave?: () => void;
  width?: ThemeSizeOptions;
  items?: {
    label: string;
    href?: string;
  }[];
};

const ContentWidth = {
  sm: 'w-32',
  md: 'w-48',
  lg: 'w-80',
};

export const DropDownMenuContentElement = (
  props: Omit<DropDownMenuContentProps, 'onChange' | 'onClick'>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const { children, className, css, as, theme, style, width } = props;
  const IDropDownMenuContent = useMemo(
    () =>
      styled(DropdownMenu.Content)<DropDownMenuContentProps>(() => ({
        // paddingLeft: style?.px ? theme.space[style.px] : theme.space['md'],
        // paddingRight: style?.px ? theme.space[style?.px] : theme.space['md'],
        // paddingTop: style?.py ? theme.space[style?.py] : theme.space['md'],
        // paddingBottom: style?.py ? theme.space[style?.py] : theme.space['md'],

        borderRadius: style?.borderRadius ? theme.radius[style.borderRadius] : theme.radius['md'],

        color: style?.color ? style.color : theme.colors.bg.base,
        backgroundColor: style?.backgroundColor ? style.backgroundColor : theme.colors.primary.base,
      })),
    [
      style?.backgroundColor,
      style?.borderRadius,
      style?.color,
      theme.colors.bg.base,
      theme.colors.primary.base,
      theme.radius,
    ],
  );
  return (
    <IDropDownMenuContent
      {...props}
      {...{
        ref,
        as: as ?? 'span',
        className: `${ContentWidth[width ?? 'md']}${className ? ' ' + className : ''}`,
        css,
        style,
        theme,
      }}
    >
      {children}
    </IDropDownMenuContent>
  );
};

export const DropDownMenuContent = withTheme(forwardRef(DropDownMenuContentElement));
