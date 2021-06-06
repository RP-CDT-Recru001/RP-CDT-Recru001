import { TFunction } from 'react-i18next';
import styled from 'styled-components';
import { px } from '../../../css/sizes';
import { TextContentPath } from '../text/Text';

const StyledUnderlinedLabel = styled.div<{ content: TextContentPath; t: TFunction<'translation'> }>`
  display: inline-block;
  border-style: none none solid none;
  border-color: ${(props) => props.theme.color};
  border-width: ${px(1.5)};
  position: relative;
  margin-bottom: ${px(15)};
  min-width: ${px(40)};
  &:after {
    content: '${(props) => props.t(props.content)}';
    background-color: transparent;
    color: ${(props) => props.theme.color};
    bottom: 0;
    left: ${px(2)};
    transform: translateY(calc(100% + ${px(0.5)}));
    position: absolute;
    padding: ${px(0.5)} ${px(1.5)};
    text-align: center;
    font-weight: bold;
    font-size: ${(props) => props.theme.size};
    opacity: 1;
  }
`;

const labelComponents = {
  StyledUnderlinedLabel
};

export default labelComponents;
