import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

export interface CheckboxProps {
    id?: string;
    name?: string;
    label?: string | JSX.Element;
    disabled?: boolean;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, name: string, value: boolean) => void;
    className?: string;
}

export interface CheckboxState {
    isChecked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
    id,
    className = '',
    name = '',
    label = '',
    disabled = false,
    checked = false,
    onChange,

}) => {
    const { register } = useForm<CheckboxState>();

    const [isChecked, setIsChecked] = useState<boolean>(checked || false);
    useEffect(() => {
        setIsChecked(checked || false);
    }, [checked]);

    const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(!isChecked);
        const value = event.target.checked;
        const name = event.target.name;
        onChange && onChange(event, name, value);
    };

    const isLabelText = label && typeof label === 'string';
    const extraClassName = isLabelText
        ? `default-icon ${className}`
        : `custom-icon ${className}`;

    return (
        <div className={`checkbox ${extraClassName}`}>
            <input
                {...register("isChecked")}
                type="checkbox"
                id={id}
                name={name}
                checked={!disabled && isChecked}
                onChange={_onChange}
                disabled={disabled}
                className={'input-checkbox'}
            />
            <label htmlFor={id}>{isLabelText ? label : null}</label>
        </div>
    )
}

export default Checkbox;