import { SvgIconComponent } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { BaseTheme } from '../../../css/theme';
import { useTheme } from '../../../hooks/themeHooks';
import iconComponents from './Icon.styled';

const { StyledIconBase } = iconComponents;

//Assuming material ui
export interface IconProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  IconComponent: SvgIconComponent;
  baseTheme?: Partial<BaseTheme>;
  className?: string;
}

const Icon: React.FunctionComponent<IconProps> = ({ IconComponent, baseTheme, className, ...divProps }): React.ReactElement => {
  const theme = useTheme(baseTheme);
  return (
    <StyledIconWrapper {...divProps} theme={theme} className={className}>
      <StyledIconBase theme={theme} IconComponent={IconComponent} />
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

export default React.memo(Icon) as typeof Icon;
