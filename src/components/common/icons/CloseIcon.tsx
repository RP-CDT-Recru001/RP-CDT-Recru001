import { useCallback } from 'react';
import { BaseTheme } from '../../../css/theme';
import React from 'react';
import MaterialCloseIcon from '@material-ui/icons/Close';
import Icon from '../../base/icon/Icon';

interface MoreLessIconProps extends Omit<React.ButtonHTMLAttributes<HTMLDivElement>, 'onClick'> {
  baseTheme?: Partial<BaseTheme>;
  clickHandler?: (ev?: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

const CloseIcon: React.FunctionComponent<MoreLessIconProps> = ({ baseTheme, clickHandler, className, ...divProps }): React.ReactElement => {
  const innerClickHandler = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      ev.preventDefault();
      clickHandler && clickHandler(ev);
    },
    [clickHandler]
  );

  return <Icon {...divProps} IconComponent={MaterialCloseIcon} baseTheme={baseTheme} onClick={innerClickHandler} className={className} />;
};

export default React.memo(CloseIcon) as typeof CloseIcon;
