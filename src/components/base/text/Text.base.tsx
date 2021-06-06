import React from 'react';
import { TFunction, useTranslation } from 'react-i18next';

export type TextElement = 'span' | 'p' | 'h1' | 'h2';
export type TextContentPath = Parameters<TFunction<'translation'>>[0];

export interface TextBaseProps {
  element?: TextElement;
  className?: string;
  //i18n guard
  content?: TextContentPath;
  children?: string;
}

const TextBase: React.FunctionComponent<TextBaseProps> = ({ element = 'p', content, className, children }): React.ReactElement => {
  const { t } = useTranslation();
  const renderText = !!content ? t(content) : children;
  return React.createElement(element, { className }, renderText);
};

export default React.memo(TextBase) as typeof TextBase;
