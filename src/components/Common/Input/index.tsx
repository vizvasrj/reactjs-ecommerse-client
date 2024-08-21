import React, { ChangeEvent } from 'react';
import ReactStars from '../../Package/react-stars';


import { InputProps } from './model';

const Input: React.FC<InputProps> = ({
    autoComplete = 'on',
    type,
    value,
    error,
    step = 1,
    decimals = true,
    min,
    max,
    disabled,
    placeholder,
    rows = 4,
    label,
    name,
    onInputChange,
    inlineElement = null
}) => {
    const _onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target instanceof HTMLInputElement && e.target.type === 'file' && e.target.files) {
            onInputChange(e.target.name, e.target.files[0]);
        } else {
            onInputChange(e.target.name, e.target.value);
        }
    };

    if (type === 'textarea') {
        const styles = `input-box${error ? ' invalid' : ''}`;

        return (
            <div className={styles}>
                {label && <label>{label}</label>}
                <textarea
                    onChange={_onChange}
                    rows={rows}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    className={'textarea-text'}
                />
                <span className='invalid-message'>{error && error[0]}</span>
            </div>
        );
    } else if (type === 'number') {
        const styles = `input-box${error ? ' invalid' : ''}`;

        const handleOnInput = (e: ChangeEvent<HTMLInputElement>) => {
            if (!decimals) {
                e.target.value = e.target.value.replace(/[^0-9]*/g, '');
            }
        };
        return (
            <div className={styles}>
                {label && <label>{label}</label>}
                <input
                    autoComplete={autoComplete}
                    step={step}
                    min={min || 0}
                    max={max || undefined}
                    pattern='[0-9]'
                    onInput={handleOnInput}
                    type={type}
                    onChange={_onChange}
                    disabled={disabled}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    className={'input-number'}
                />
                <span className='invalid-message'>{error && error[0]}</span>
            </div>
        );
    } else if (type === 'stars') {
        const styles = `input-box${error ? ' invalid' : ''}`;

        return (
            <div className={styles}>
                {label && <label>{label}</label>}
                <ReactStars
                    classNames={name}
                    count={5}
                    size={30}
                    color={'#adb5bd'}
                    activeColor={'#ffb302'}
                    a11y={true}
                    isHalf={false}
                    emptyIcon={<i className='fa fa-star' />}
                    halfIcon={<i className='fa fa-star-half-alt' />}
                    filledIcon={<i className='fa fa-star' />}
                    value={Number(value)}
                    onChange={(value: number) => {
                        onInputChange(name, value);
                    }}
                />
                <span className='invalid-message'>{error && error[0]}</span>
            </div>
        );
    } else {
        const styles = `input-box${inlineElement ? ` inline-btn-box` : ''} ${error ? 'invalid' : ''
            }`;

        return (
            <div className={styles}>
                {label && <label>{label}</label>}
                <div className='input-text-block'>
                    <input
                        className={'input-text'}
                        autoComplete={autoComplete}
                        type={type}
                        onChange={_onChange}
                        disabled={disabled}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                    />
                    {inlineElement}
                </div>
                <span className='invalid-message'>{error && error[0]}</span>
            </div>
        );
    }
};


export default Input;