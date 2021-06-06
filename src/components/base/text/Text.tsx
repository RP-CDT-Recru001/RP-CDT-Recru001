import React from 'react';
import { TFunction } from 'react-i18next';
import { BaseTheme } from '../../../css/theme';
import { useTheme } from '../../../hooks/themeHooks';
import baseTextComponents from './Text.styled';
export type TextElement = 'span' | 'p' | 'h1' | 'h2';
export type TextContentPath = Parameters<TFunction<'translation'>>[0];

const { StyledText } = baseTextComponents;

export interface TextProps {
  element?: TextElement;
  className?: string;
  //i18n guard
  content?: TextContentPath;
  children?: string;
  baseTheme?: Partial<BaseTheme>;
}

const Text: React.FunctionComponent<TextProps> = ({ element = 'p', content, className, children, baseTheme }): React.ReactElement => {
  const theme = useTheme(baseTheme);
  return (
    <StyledText element={element} content={content} className={className} theme={theme}>
      {children}
    </StyledText>
  );
};

export default React.memo(Text) as typeof Text;
