import styledComponent from 'styled-components';
import { color } from '../../../css/colors';
import { px, size } from '../../../css/sizes';

const hoveredCss = `
  -webkit-box-shadow: inset 0px 0px 15px 1px ${color('HOVER')}; 
  box-shadow: inset 0px 0px 15px 1px ${color('HOVER')};
`;

const StyledButton = styledComponent.button<{ hovered: boolean }>`
  padding: ${px(5)} ${px(5)};
  margin: ${size('MARGIN_BASE')};
  border-radius: 15%;
  text-align: center;
  text-decoration: none;
  border: 2px solid ${color('FRAMING')};
  &:active {
    -webkit-box-shadow: 0px 0px 5px 1px ${color('ACTIVE')};
    box-shadow: 0px 0px 5px 1px ${color('ACTIVE')};
  };
  background-color: ${(props) => props.theme.color};
  font-size: ${(props) => props.theme.size};
  ${(props) => !!props.hovered && hoveredCss}
`;

const baseButtonComponents = {
  StyledButton
};

export default baseButtonComponents;
