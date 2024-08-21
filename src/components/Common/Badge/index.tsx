import React from 'react';
import { BadgeProps } from './model';

const variants = {
    primary: 'custom-badge-primary',
    secondary: 'custom-badge-secondary',
    danger: 'custom-badge-danger',
    dark: 'custom-badge-dark',
    none: 'custom-badge-none',
    empty: ''
};

const Badge: React.FC<BadgeProps> = ({
    variant = 'secondary',
    className = '',
    borderless = false,
    round = 3,
    children
}) => {
    const v = variant ? variants[variant] : '';

    const badgeVariant = v;

    const classNames = `custom-badge${`${className && ` ${className}`}`}${
        badgeVariant && ` ${badgeVariant}`
    }`;

    return (
        <span
            className={classNames}
            style={{
                borderRadius: borderless ? 0 : round
            }}
        >
            {children}
        </span>
    );
};

export default Badge;