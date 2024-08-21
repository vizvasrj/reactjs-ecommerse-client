import React, { FC } from 'react';
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';


import { PopoverProps } from './model';

const Popover: FC<PopoverProps> = ({ target, placement='top', popoverTitle, children }) => {
    return (
        <UncontrolledPopover placement={placement} target={target} trigger='legacy'>
            {popoverTitle && <PopoverHeader>{popoverTitle}</PopoverHeader>}
            <PopoverBody>{children}</PopoverBody>
        </UncontrolledPopover>
    );
};

export default Popover;