import { omit } from 'lodash';
import { StrictMode, forwardRef, useState } from 'react';

import { motion } from 'framer-motion';
import { withTheme } from '@emotion/react';

import { Span, SpanProps, SpanStyle } from '@libs/components';

type FormControlStyle = SpanStyle & {
  // nothing
};

export type FormControlProps = SpanProps & {
  style?: Partial<FormControlStyle>;
  colorScheme?: string;
  type?: 'text' | 'password' | 'number' | 'checkbox' | 'radio' | 'hidden' | 'range' | 'submit';
  error?: string;
  name: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  defaultValue?: string;
  id?: string;
  geterror?: () => string | undefined;
};

const FormControlInputElement = (
  props: Omit<FormControlProps, 'onChange' | 'onClick'> & {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: React.SyntheticEvent<HTMLInputElement, MouseEvent>) => void;
  },
  ref: React.Ref<HTMLInputElement>,
) => {
  const { children, onChange, onClick, type, value, style, theme, disabled } = props;
  return (
    <input
      {...omit(props, 'theme', 'geterror')}
      {...{
        ref,
        type: type ? type : 'text',
        onChange,
        onClick,
        value: value,
        style:
          type == 'submit'
            ? {
                margin: 'auto',
                cursor: disabled ? 'not-allowed' : 'pointer',

                paddingLeft: style?.px ? theme.space[style.px] : theme.space['md'],
                paddingRight: style?.px ? theme.space[style?.px] : theme.space['md'],
                paddingTop: style?.py ? theme.space[style?.py] : theme.space['sm'],
                paddingBottom: style?.py ? theme.space[style?.py] : theme.space['sm'],

                borderWidth: style?.borderWidth ? style?.borderWidth : style?.variant === 'ghost' ? undefined : 1,
                borderRadius: style?.borderRadius ? theme.radius[style.borderRadius] : theme.radius['md'],

                color: disabled
                  ? theme.colors.primary.dark
                  : style?.color
                  ? style.color
                  : style?.variant === 'solid'
                  ? theme.colors.bg.base
                  : theme.colors.primary.base,
                backgroundColor: disabled ? theme.colors.bg.light : 'transparent',
              }
            : {
                flex: '0 1 auto',
                flexBasis: 0,
                paddingLeft: style?.px ? theme.space[style.px] : theme.space['md'],
                paddingRight: style?.px ? theme.space[style?.px] : theme.space['md'],
                paddingTop: style?.py ? theme.space[style?.py] : theme.space['sm'],
                paddingBottom: style?.py ? theme.space[style?.py] : theme.space['sm'],

                color: disabled
                  ? theme.colors.primary.dark
                  : style?.color
                  ? style.color
                  : style?.variant === 'solid'
                  ? theme.colors.bg.base
                  : theme.colors.primary.base,
                backgroundColor: disabled ? theme.colors.bg.light : 'transparent',

                borderWidth: style?.borderWidth ? style.borderWidth : style?.variant === 'ghost' ? undefined : 1,
                borderRadius: style?.borderRadius ? theme.radius[style.borderRadius] : theme.radius['md'],
                // borderColor: style?.borderColor ?? colorScheme ?? theme.colors.primary.base,

                fontSize: style?.size ? theme.fontSizes[style.size] : theme.fontSizes['md'],
              },
      }}
    >
      {children}
    </input>
  );
};

const FormControlInput = withTheme(forwardRef(FormControlInputElement));

const FormControlElement = (
  props: Omit<FormControlProps, 'onChange' | 'onClick'> & {
    onChange?: (name: string, value: string) => void;
    onClick?: (target: HTMLInputElement) => void;
  },
  ref: React.Ref<HTMLInputElement>,
) => {
  const { children, onChange, onClick, theme, type, error, name, value, geterror, defaultValue } = props;
  const [data, setData] = useState(type === 'submit' ? value ?? name : value ?? defaultValue ?? '');
  const [IError, setIError] = useState(error);
  // const [active, setActive] = useState(false);

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
    onChange && onChange(name, event.target.value);
    geterror && setIError(geterror());
  };

  const _onClick = (event: React.SyntheticEvent<HTMLInputElement, MouseEvent>) => {
    onClick && onClick(event.target as HTMLInputElement);
  };

  return (
    <StrictMode>
      <div className="flex flex-col">
        {/* {type !== 'submit' && <Span as="label">{startCase(label ?? name)}</Span>} */}
        <FormControlInput
          {...props}
          {...{
            ref,
            onChange: _onChange,
            onClick: _onClick,
            type: type ? type : 'text',
            value: data,
          }}
        >
          {children}
        </FormControlInput>
        {IError && (
          <motion.div
            animate={IError ? 'open' : ''}
            variants={{
              open: {
                scaleY: ['0%', '100%'],
              },
            }}
            transition={{
              duration: 0.4,
            }}
          >
            <Span as="label" style={{ color: theme.colors.error.base, size: 'sm' }}>
              {IError}
            </Span>
          </motion.div>
        )}
      </div>
    </StrictMode>
  );
};

export const FormControl = withTheme(forwardRef(FormControlElement));
