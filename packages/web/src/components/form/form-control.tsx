import React, { useEffect, useMemo, useState } from 'react';

import { motion } from 'framer-motion';
import { withTheme } from '@emotion/react';
import { omit, startCase } from 'lodash';

import { Span, SpanProps, SpanStyle } from '@components/core';
import { useHookFormData, useHookFormValue } from '@hooks/HookFormProvider';

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
  label?: string;
  form: string;
};

const FormInputElement = (props: FormControlProps, ref: React.Ref<HTMLInputElement>) => {
  const { onChange, onClick, children, className, theme, colorScheme, style, name, placeholder, label, form } = props;
  const { setValue, setError } = useHookFormData();
  const state = useHookFormValue();
  useEffect(() => {
    // setValue(form, name, 'Hello World!');
    // console.log(state[form].values);
  }, []);

  // const [data, setData] = useState(state[form]?.[name] ?? '');
  return (
    <input
      {...omit(props, 'theme')}
      {...{
        ref,
        onChange: (event) => {
          setValue(form, name as string, event.target.value);
          // setData(event.target.value);
          onChange && onChange(event);
        },
        onClick,
        className,
        style: {
          paddingLeft: style?.px ?? theme.space[style?.px] ?? theme.space['md'],
          paddingRight: style?.px ?? theme.space[style?.px] ?? theme.space['md'],
          paddingTop: style?.py ?? theme.space[style?.py] ?? theme.space['sm'],
          paddingBottom: style?.py ?? theme.space[style?.py] ?? theme.space['sm'],

          color: style?.color ?? colorScheme ?? theme.colors.primary.base,
          backgroundColor: 'transparent',

          borderWidth: style?.borderWidth ?? style?.variant === 'ghost' ? null : 1,
          borderRadius: theme.radius[style?.borderRadius] ?? theme.radius['md'],
          // borderColor: style?.borderColor ?? colorScheme ?? theme.colors.primary.base,

          fontSize: theme.fontSizes[style?.size] ?? theme.fontSizes['md'],
        },
        value: state[form]?.values[name] ?? '',
        placeholder: startCase(placeholder ?? label ?? name),
      }}
    >
      {children}
    </input>
  );
};

const FormInput = React.forwardRef(FormInputElement);

const FormControlElement = (
  props: Omit<FormControlProps, 'onChange' | 'onClick'> & {
    onChange?: (name: string, value: string) => string;
    onClick?: (target: HTMLInputElement) => void;
  },
  ref: React.Ref<HTMLInputElement>,
) => {
  const { children, onChange, onClick, theme, type, error, name } = props;
  const [active, setActive] = useState(false);
  const [IError, setError] = useState(error);
  useEffect(() => {
    setError(error);
  }, [error]);
  const FormControlInput = useMemo(() => {
    const onChangeFunc = (event: React.ChangeEvent) => {
      event.preventDefault();
      event.stopPropagation();
      !active && setActive(true);
      onChange && setError(onChange(name, (event.target as HTMLInputElement).value));
    };
    const onClickFunc = (event: React.SyntheticEvent<HTMLElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();
      !active && setActive(true);
      onClick && onClick(event.target as HTMLInputElement);
    };
    return (
      <FormInput
        {...props}
        {...{
          ref,
          onChange: onChangeFunc,
          onClick: onClickFunc,
          type: type ? type : 'text',
        }}
      >
        {children}
      </FormInput>
    );
  }, [active, children, name, onChange, onClick, props, ref, type]);
  return (
    <React.StrictMode>
      <div className="flex flex-col">
        {/* {type !== 'submit' && <Span as="label">{startCase(label ?? name)}</Span>} */}
        {FormControlInput}
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
    </React.StrictMode>
  );
};

export const FormControl = withTheme(React.forwardRef(FormControlElement));
