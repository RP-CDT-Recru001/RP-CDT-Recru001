import { useCallback, useMemo, useState } from 'react';
import { BaseTheme } from '../../../css/theme';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import React from 'react';
import Icon from '../../base/icon/Icon';

interface MoreLessIconProps extends Omit<React.ButtonHTMLAttributes<HTMLDivElement>, 'onClick'> {
  baseTheme?: Partial<BaseTheme>;
  clickHandler?: (collapsed: boolean) => void;
  initialState?: boolean;
  className?: string;
}

const MoreLessIcon: React.FunctionComponent<MoreLessIconProps> = ({
  baseTheme,
  clickHandler,
  initialState = false,
  className,
  ...divProps
}): React.ReactElement => {
  const [collapsed, setCollapsed] = useState<boolean>(initialState);

  const toggleCollapsed = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      ev.preventDefault();
      setCollapsed(!collapsed);
      clickHandler && clickHandler(collapsed);
    },
    [collapsed, clickHandler]
  );

  const IconComponent = useMemo(() => (collapsed ? ExpandLess : ExpandMore), [collapsed]);

  return <Icon {...divProps} IconComponent={IconComponent} baseTheme={baseTheme} onClick={toggleCollapsed} className={className} />;
};

export default React.memo(MoreLessIcon) as typeof MoreLessIcon;
