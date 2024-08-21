import React, { FC, ReactNode } from 'react';
import Tooltip from '../Tooltip';
import Popover from '../Popover';
import { ButtonProps, Variant } from './model';

const variants: Record<Variant, string> = {
    primary: 'custom-btn-primary',
    secondary: 'custom-btn-secondary',
    danger: 'custom-btn-danger',
    link: 'custom-btn-link',
    dark: 'custom-btn-dark',
    none: 'custom-btn-none',
    empty: ''
};


const Button: FC<ButtonProps> = ({
    type = 'button',
    variant = 'secondary',
    size = 'md',
    className = '',
    iconDirection = 'left',
    iconClassName = '',
    borderless = false,
    round = 3,
    tooltip = false,
    popover = false,
    id,
    tabIndex,
    ariaLabel,
    ariaExpanded,
    disabled,
    text,
    role,
    icon,
    onClick,
    tooltipContent,
    popoverContent,
    popoverTitle
}) => {
    const v = variant ? variants[variant] : '';

    const btnVariant = v;

    const btn =
        icon && text ? 'with-icon' : icon && !text ? 'icon-only' : 'text-only';

    const classNames = `input-btn${`${className && ` ${className}`}`}${btnVariant && ` ${btnVariant}`
        }${` ${size}`} ${btn} ${iconDirection === 'left' ? 'icon-left' : 'icon-right'
        } ${borderless ? 'border-0' : ''}`;

    const iconClassNames = `btn-icon${`${iconClassName && ` ${iconClassName}`}`}`;

    const tooltipId = tooltip ? `tooltip-${id}` : id;
    const popoverId = popover ? `popover-${id}` : id;
    const btnId = tooltip ? tooltipId : popoverId;

    return (
        <button
            id={btnId}
            tabIndex={tabIndex}
            aria-label={ariaLabel}
            aria-expanded={ariaExpanded}
            role={role}
            disabled={disabled}
            className={classNames}
            type={type}
            onClick={onClick}
            style={{
                borderRadius: round
            }}
        >
            {tooltip && tooltipId && <Tooltip target={tooltipId}>{tooltipContent}</Tooltip>}
            {popover && popoverId &&  (
                <Popover target={popoverId} popoverTitle={popoverTitle}>
                    {popoverContent}
                </Popover>
            )}
            {iconDirection === 'left' ? (
                <>
                    {icon && <div className={iconClassNames}>{icon}</div>}
                    {text && <span className='btn-text'>{text}</span>}
                </>
            ) : (
                <>
                    {text && <span className='btn-text'>{text}</span>}
                    {icon && <div className={iconClassNames}>{icon}</div>}
                </>
            )}
        </button>
    );
};


export default Button;