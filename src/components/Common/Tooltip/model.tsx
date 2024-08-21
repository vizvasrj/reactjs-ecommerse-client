import { ReactNode } from 'react';

import { TooltipProps as ReactstrapTooltipProps } from 'reactstrap';

export interface TooltipProps {
    target: string;
    placement?: ReactstrapTooltipProps['placement'];
    children: ReactNode;
}
