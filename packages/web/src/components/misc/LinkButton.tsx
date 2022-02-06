/** @jsxImportSource @emotion/react */
import { withTheme } from '@emotion/react';
import Link from 'next/link';

import { Theme } from '@themes/ThemeProvider';
import Button, { ButtonProps } from './Button';

type LinkButtonProps = {
  href: string;
  theme: Theme;
} & ButtonProps;

const LinkButton = (props: LinkButtonProps) => {
  const { children, onClick, href, color, appearance, theme } = props;
  return (
    <Button onClick={onClick} appearance={appearance} color={color}>
      <Link href={href}>
        <span style={{ color: appearance === 'minimal' ? theme.colors.primary.base : theme.colors.bg.base }}>
          {children}
        </span>
      </Link>
    </Button>
  );
};

export default withTheme(LinkButton);
