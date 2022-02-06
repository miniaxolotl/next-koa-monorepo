import React from 'react';

import { Theme } from '@themes/ThemeProvider';
import { IconType } from 'react-icons/lib';
import Button, { ButtonProps } from './Button';
import { withTheme } from '@emotion/react';

type IconButtonProps = {
  theme: Theme;
  icon: IconType;
  label?: string;
} & ButtonProps;

const IconButton = (props: IconButtonProps) => {
  const { onClick, color, appearance, icon, theme, label } = props;
  const Icon = icon;
  return (
    <Button onClick={onClick} appearance={appearance} color={color} className="icon-button">
      <span
        style={{ color: appearance === 'minimal' ? theme.colors.primary.base : theme.colors.bg.base }}
        className="flex flex-row align-bottom items-center"
      >
        {label && <span>{label}</span>} <Icon />
      </span>
    </Button>
  );
};

export default withTheme(IconButton);
