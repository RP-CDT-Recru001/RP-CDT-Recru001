import React from 'react';
import styled from 'styled-components';
import { BaseTheme } from '../../../css/theme';
import { useTheme } from '../../../hooks/themeHooks';
import baseSpinnerComponents from './Spinner.styled';

const { StyledICircularProgress } = baseSpinnerComponents;

//Assuming material ui
export interface IconProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  baseTheme?: Partial<BaseTheme>;
  className?: string;
}

const Spinner: React.FunctionComponent<IconProps> = ({ baseTheme, className, ...divProps }): React.ReactElement => {
  const theme = useTheme(baseTheme);
  return (
    <StyledIconWrapper {...divProps} theme={theme} className={className}>
      <StyledICircularProgress theme={theme} />
    </StyledIconWrapper>
  );
};

const StyledIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme?.color};
  font-size: ${(props) => props.theme?.size};
  color: ${(props) => props.theme?.fontColor};
`;

export default React.memo(Spinner) as typeof Spinner;
