import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseTheme } from '../../../css/theme';
import { useTheme } from '../../../hooks/themeHooks';
import { TextContentPath } from '../text/Text';
import labelComponents from './UnderlineLabel.styled';

const { StyledUnderlinedLabel } = labelComponents;

export interface UnderlineLabelProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  //i18n guard
  content: TextContentPath;
  baseTheme?: Partial<BaseTheme>;
}

const UnderlineLabel: React.FunctionComponent<UnderlineLabelProps> = ({
  content,
  baseTheme,
  children,
  ...divProps
}): React.ReactElement => {
  //any guarded by content type
  const { t } = useTranslation();
  const theme = useTheme(baseTheme);

  return (
    <StyledUnderlinedLabel {...divProps} content={content} t={t} theme={theme}>
      {children}
    </StyledUnderlinedLabel>
  );
};

export default React.memo(UnderlineLabel) as typeof UnderlineLabel;
