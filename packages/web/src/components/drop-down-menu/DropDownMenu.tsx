import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DropDownMenuContent } from './DropDownMenuContent';
import { DropDownMenuItem } from './DropDownMenuItem';
import { ThemeSizeOptions } from '@libs/themes';
import styled from '@emotion/styled';
import { withTheme } from '@emotion/react';
import { Anchor, BoxProps, BoxStyle } from '@libs/components';
import React, { SyntheticEvent, forwardRef, useMemo, useState } from 'react';

export type DropDownMenuStyle = BoxStyle & {
  // nothing
};

type DropDownMenuProps = BoxProps & {
  children?: React.ReactNode;
  width?: ThemeSizeOptions;
  items?: {
    label: string;
    href?: string;
    onClick?: (event: SyntheticEvent<HTMLAnchorElement, MouseEvent>) => void;
  }[];
};

export const DropDownMenuElement = (props: DropDownMenuProps, ref: React.Ref<HTMLBaseElement>) => {
  const { children, className, css, as, theme, style, items, width } = props;
  const _items = items?.map((item, index) => (
    <DropDownMenuItem
      key={index}
      className="flex"
      style={{
        text: style?.text,
      }}
      onClick={item.onClick as (event: SyntheticEvent<HTMLBaseElement, MouseEvent>) => void}
    >
      <Anchor
        href={item.href}
        className="flex-grow w-full h-full"
        onClick={item.onClick as (event: SyntheticEvent<HTMLBaseElement, MouseEvent>) => void}
        style={{
          color: theme.colors.bg.base,

          px: 'md',
          // paddingRight: style?.px ? theme.space[style?.px] : theme.space['md'],
          py: 'md',
          // paddingBottom: style?.py ? theme.space[style?.py] : theme.space['md'],
        }}
      >
        {item.label}
      </Anchor>
    </DropDownMenuItem>
  ));
  const IDropDownMenu = useMemo(
    () =>
      styled(DropdownMenu.Root)<BoxProps>(() => ({
        // nothing
      })),
    [],
  );
  const [open, setOpen] = useState(false);
  return (
    <IDropDownMenu
      {...props}
      {...{
        ref,
        as: as ?? 'span',
        className,
        open: open,
        onOpenChange: (open: boolean) => setOpen(open),
        css,
        style,
        theme,
      }}
    >
      <DropdownMenu.Trigger
        style={{ borderColor: 'transparent', borderRadius: theme.radius['md'] }}
        {
          ...{
            // onMouseEnter: () => setOpen(true),
          }
        }
        // onOpenChange: (open: boolean) => setOpen(open),
      >
        {children}
      </DropdownMenu.Trigger>
      <DropDownMenuContent
        {...{
          onMouseLeave: () => setOpen(false),
        }}
        width={width}
      >
        {_items}{' '}
      </DropDownMenuContent>
    </IDropDownMenu>
  );
};

export const DropDownMenu = withTheme(forwardRef(DropDownMenuElement));
