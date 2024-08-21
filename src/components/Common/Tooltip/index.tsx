import React, { FC } from 'react';
import { UncontrolledTooltip } from 'reactstrap';

import { TooltipProps } from './model';

const Tooltip: FC<TooltipProps> = ({ target, placement = 'top', children }) => {
    return (
        <UncontrolledTooltip placement={placement} target={target}>
            {children}
        </UncontrolledTooltip>
    );
};

export default Tooltip;