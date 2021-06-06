import { SvgIconComponent } from '@material-ui/icons';
import React from 'react';

//Assuming material ui
export interface IconBaseProps {
  IconComponent: SvgIconComponent;
  className?: string;
}

const IconBase: React.FunctionComponent<IconBaseProps> = ({ IconComponent, className }): React.ReactElement => {
  return <IconComponent className={className} />;
};

export default React.memo(IconBase) as typeof IconBase;
