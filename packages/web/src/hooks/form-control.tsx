/** @jsxImportSource @emotion/react */
import { withTheme } from '@emotion/react';
import { Theme, useTheme } from '@themes/ThemeProvider';
import _ from 'lodash';
import { useCallback, useState } from 'react';

export type FormControlProps = {
  type: 'text';
  onChange?: (name: string, value: string) => void;
  name: string;
  id?: string;
  theme?: Theme;
  label?: string;
  value?: string;
  error?: string;
};

export const FormControl = ({ type, onChange, theme, name, id, label, value, error }: FormControlProps) => {
  const t = useTheme();
  const [data, setData] = useState(value);
  const _onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setData(e.target.value);
      if (onChange) onChange(name, e.target.value);
    },
    [data],
  );
  const style = () => {
    return {
      backgroundColor: t === 'light' ? theme.colors.bg.dark : theme.colors.bg.light,
      color: t === 'light' ? theme.colors.primary.dark : theme.colors.primary.light,
    };
  };
  const labelStyle = () => {
    return {
      color: t === 'light' ? theme.colors.primary.light : theme.colors.primary.dark,
      whitespace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };
  };
  const errorStyle = () => {
    return {
      color: t === 'light' ? theme.colors.error.dark : theme.colors.error.light,
    };
  };
  return (
    <div css={labelStyle} className="form-control flex flex-col ">
      <label className="label ">{_.startCase(label ?? name)}</label>
      <input css={style} className="input" id={_.snakeCase(id ?? name)} type={type} onChange={_onChange} value={data} />
      <label css={errorStyle} className="label error">
        {error}
      </label>
    </div>
  );
};

export default withTheme(FormControl);
