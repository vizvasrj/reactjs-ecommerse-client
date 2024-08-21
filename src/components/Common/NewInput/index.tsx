import React, { ChangeEvent } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputProps {
    label: string;
    type: string;
    name: string;
    register: UseFormRegister<any>;
    required: boolean;
    errorMessage: string;
    fieldType: 'input' | 'textarea' | 'number';
    onInputChange?: (name: string, value: string | File) => void;
    rows?: number;
    placeholder?: string;
    value?: string | number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    decimals?: boolean;
    autoComplete?: string;

}

const Input: React.FC<InputProps> = ({ label, type, name, register, required, errorMessage, fieldType, onInputChange, rows, placeholder, value, min, max, step, disabled, decimals, autoComplete }) => {
    const _onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (onInputChange) {
            if (e.target instanceof HTMLInputElement && e.target.type === 'file' && e.target.files) {
                onInputChange(e.target.name, e.target.files[0]);
            } else {
                onInputChange(e.target.name, e.target.value);
            }
        }
    };

    const styles = `input-box${errorMessage ? ' invalid' : ''}`;
    let handleOnInput = (e: ChangeEvent<HTMLInputElement>) => { }
    if (type === 'number') {
        handleOnInput = (e: ChangeEvent<HTMLInputElement>) => {
            e.target.value = e.target.value.replace(/[^0-9]*/g, '');
        };
    }

    return (
        <div className={styles}>
            <label>{label}</label>
            {fieldType === 'input' ? (
                <input {...register(name, { required })} type={type} onChange={_onChange} />
            ) : fieldType === 'textarea' ? (
                <textarea {...register(name, { required })} onChange={_onChange} rows={rows} name={name} value={value} placeholder={placeholder} className={'textarea-text'} />
            ) : fieldType === 'number' ? (
                <input {...register(name, { required })} type={type} onChange={_onChange}
                    onInput={handleOnInput} value={value} min={min || 1} max={max} step={step} />

            ) : null
            }
            <span className='invalid-message'>{errorMessage && errorMessage}</span>
        </div>
    );
};

export default Input;