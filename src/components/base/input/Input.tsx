import React from 'react';
import { useTheme } from '../../../hooks/themeHooks';
import { BaseTheme } from '../../../css/theme';
import inputComponents from './Input.styled';

const { StyledInput } = inputComponents;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  baseTheme?: Partial<BaseTheme>;
  //override: {}; //ToDo
}

const Input: React.FunctionComponent<InputProps> = ({ baseTheme, ...inputProps }): React.ReactElement => {
  const theme = useTheme(baseTheme);
  return <StyledInput {...inputProps} theme={theme} />;
};

export default Input;
