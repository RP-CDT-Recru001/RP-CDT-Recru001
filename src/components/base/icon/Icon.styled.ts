import styled from 'styled-components';
import IconBase from './Icon.base';

const StyledIconBase = styled(IconBase)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color};
  font-size: ${(props) => props.theme.size} !important; //grr Material styles override
  color: ${(props) => props.theme.fontColor};
`;

const baseIconComponents = {
  StyledIconBase
};

export default baseIconComponents;
