import styled from 'styled-components';
import TextBase from './Text.base';

const StyledText = styled(TextBase)`
  font-size: ${(props) => props.theme.size};
  color: ${(props) => props.theme.fontColor};
`;

const baseTextComponents = {
  StyledText
};

export default baseTextComponents;
