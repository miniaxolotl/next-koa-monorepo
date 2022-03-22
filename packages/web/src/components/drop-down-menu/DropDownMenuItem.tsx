import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ThemeSizeOptions } from '@libs/themes';
import styled from '@emotion/styled';
import { withTheme } from '@emotion/react';
import { BoxProps, BoxStyle } from '@libs/components';
import React, { MouseEventHandler, forwardRef, useMemo } from 'react';

export type DropDownMenuItemStyle = BoxStyle & {
  // nothing
};

type DropDownMenuItemProps = BoxProps & {
  children?: React.ReactNode;
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

export const DropDownMenuItemElement = (
  props: Omit<DropDownMenuItemProps, 'onChange'>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const { children, className, css, as, theme, style, width, onClick } = props;
  const IDropDownMenuItem = useMemo(
    () =>
      styled(DropdownMenu.Item)<
        Omit<DropDownMenuItemProps, 'onClick'> & {
          // onClick: MouseEventHandler<HTMLDivElement> | undefined;
        }
      >(() => ({
        width: '100%',

        borderRadius: style?.borderRadius ? theme.radius[style.borderRadius] : theme.radius['md'],

        textAlign: style?.text ?? undefined,
        color: style?.color ? style.color : theme.colors.bg.base,
        backgroundColor: style?.backgroundColor ? style.backgroundColor : theme.colors.primary.base,

        ':hover': {
          backgroundColor: style?.backgroundColor ? style.backgroundColor : theme.colors.primary.dark,
        },
      })),
    [
      style?.borderRadius,
      style?.text,
      style?.color,
      style?.backgroundColor,
      theme.radius,
      theme.colors.bg.base,
      theme.colors.primary.base,
      theme.colors.primary.dark,
    ],
  );
  return (
    <IDropDownMenuItem
      {...props}
      {...{
        ref,
        as: as ?? 'div',
        onClick: onClick as MouseEventHandler<HTMLDivElement> | undefined,
        className: `${ContentWidth[width ?? 'md']}${className ? ' ' + className : ''}`,
        css,
        style,
        theme,
      }}
    >
      {children}
    </IDropDownMenuItem>
  );
};

export const DropDownMenuItem = withTheme(forwardRef(DropDownMenuItemElement));
