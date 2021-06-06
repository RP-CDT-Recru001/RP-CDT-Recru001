import styled from 'styled-components';
import { px, size } from '../../../css/sizes';

const StyledInput = styled.input`
  background: transparent;
  padding: ${px(5)} ${px(5)};
  font-size: ${(props) => props.theme.size};
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.color};
  margin: ${size('MARGIN_BASE')} ${size('MARGIN_BASE')};
`;

const baseInputComponents = {
  StyledInput
};

export default baseInputComponents;
