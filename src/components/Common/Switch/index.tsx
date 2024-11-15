import React, { ChangeEvent, useState, useEffect } from 'react';
import Tooltip from '../Tooltip';

interface SwitchProps {
    checked: boolean;
    className?: string;
    style?: React.CSSProperties;
    id: string;
    label?: string;
    tooltip?: boolean;
    tooltipContent?: string;
    toggleCheckboxChange?: (value: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({
    checked,
    className,
    style,
    id,
    label,
    tooltip,
    tooltipContent,
    toggleCheckboxChange
}) => {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        setIsChecked(value);

        if (toggleCheckboxChange) {
            toggleCheckboxChange(value);
        }
    };

    const tooltipId = `tooltip-${id}`;
    const classNames = `switch-checkbox${className ? ` ${className}` : ''}`;

    return (
        <div className={classNames} id={tooltipId} style={style}>
            {tooltip && <Tooltip target={tooltipId}>{tooltipContent}</Tooltip>}
            <input
                id={id}
                type="checkbox"
                className="switch-checkbox-input"
                checked={isChecked}
                onChange={onChange}
            />
            <label htmlFor={id} className="switch-label">
                {label && <span className="switch-label-text">{label} </span>}
                <span className="switch-label-toggle"></span>
            </label>
        </div>
    );
};

export default Switch;
