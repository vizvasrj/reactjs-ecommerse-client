import { ReactNode } from 'react';

export type ButtonProps = {
    id?: string;
    size?: string;
    variant?: Variant;
    tabIndex?: number;
    ariaLabel?: string;
    ariaExpanded?: boolean;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    text?: string;
    role?: string;
    icon?: ReactNode;
    iconDirection?: 'left' | 'right';
    iconClassName?: string;
    borderless?: boolean;
    round?: number;
    onClick?: () => void;
    tooltip?: boolean;
    tooltipContent?: ReactNode;
    popover?: boolean;
    popoverContent?: ReactNode;
    popoverTitle?: string;
};

export type Variant = 'primary' | 'secondary' | 'danger' | 'link' | 'dark' | 'none' | 'empty';
