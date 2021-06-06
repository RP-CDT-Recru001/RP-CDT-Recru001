import React from 'react';
import styled from 'styled-components';
import { px } from '../../../css/sizes';
import { BaseTheme } from '../../../css/theme';
import { TextContentPath, TextElement } from '../../base/text/Text';
import Text from '../../base/text/Text';
import UnderlineLabel from '../../base/underline-label/UnderlineLabel';

export interface LabeledTextProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  baseTextTheme?: Partial<BaseTheme>;
  baseLabelTheme?: Partial<BaseTheme>;
  element?: TextElement;
  className?: string;
  label: TextContentPath;
  content?: TextContentPath;
  children: string;
}

const LabeledText: React.FunctionComponent<LabeledTextProps> = ({
  baseTextTheme,
  baseLabelTheme,
  label,
  className,
  children,
  element,
  content,
  ...divProps
}): React.ReactElement => {
  //const textTheme = useTheme(baseTextTheme);

  return (
    <Wrapper aria-label={label as string} {...divProps}>
      <UnderlineLabel content={label} baseTheme={baseLabelTheme}>
        <StyledText element={element} content={content} baseTheme={baseTextTheme}>
          {children}
        </StyledText>
      </UnderlineLabel>
    </Wrapper>
  );
};

const StyledText = styled(Text)`
  margin: ${px(2)};
  display: block;
`;

const Wrapper = styled.div`
  width: 100%;
  display: inline-block;
`;

export default React.memo(LabeledText) as typeof LabeledText;
