import React from 'react';
import { Placement } from '@popperjs/core';


export interface PopoverProps {
    target: string;
    placement?: Placement;
    popoverTitle?: string;
    children: React.ReactNode;
}
