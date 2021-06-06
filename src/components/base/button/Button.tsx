import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon, { IconProps } from '../icon/Icon';
import { TextContentPath } from '../text/Text';
import buttonComponents from './Button.styled';
import { useTheme } from '../../../hooks/themeHooks';
import { BaseTheme } from '../../../css/theme';

//import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
const { StyledButton } = buttonComponents;

export interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconProps;
  text?: TextContentPath;
  baseTheme: Partial<BaseTheme>;
  className?: string;
  //override: {}; //ToDo
}
//unfortunate naming
const Button: React.FunctionComponent<StyledButtonProps> = ({ baseTheme, icon, text, className, ...buttonProps }): React.ReactElement => {
  const { t } = useTranslation();
  const theme = useTheme(baseTheme);
  const [hovered, setHovered] = useState<boolean>(false);

  //dirty hack fot TS and styled components props active + hoover issue
  const innerOnMouseEnter = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setHovered(true);
      !!buttonProps?.onMouseEnter && buttonProps.onMouseEnter(ev);
    },
    [buttonProps]
  );

  const innerOnMouseLeave = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setHovered(false);
      !!buttonProps?.onMouseLeave && buttonProps.onMouseLeave(ev);
    },
    [buttonProps]
  );

  return (
    <StyledButton
      className={className}
      theme={theme}
      hovered={hovered}
      {...buttonProps}
      onMouseLeave={innerOnMouseLeave}
      onMouseEnter={innerOnMouseEnter}
    >
      {!!icon && <Icon {...icon} />}
      {!!text && t(text)}
    </StyledButton>
  );
};

export default React.memo(Button) as typeof Button;
