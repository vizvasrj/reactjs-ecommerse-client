/**
 *
 * SelectOption
 *
 */

import React from 'react';

import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';
import makeAnimated from 'react-select/animated';

interface SelectOptionProps<T extends string | number> {
    disabled?: boolean;
    error?: string;
    label?: string;
    multi?: boolean;
    options: { value: T; label: string }[];
    defaultValue?: { value: T; label: string }[];
    value?: { value: T; label: string } | { value: T; label: string }[];
    handleSelectChange: (value: { value: T; label: string }[] | { value: T; label: string }) => void;
}

const SelectOption: React.FC<SelectOptionProps<string | number>> = ({
    disabled,
    error,
    label,
    multi,
    options,
    defaultValue,
    value,
    handleSelectChange,
}) => {
    const _handleSelectChange = (
        newValue: MultiValue<{ value: string | number; label: string }> |
            SingleValue<{ value: string | number; label: string }> | null,
        actionMeta: ActionMeta<{ value: string | number; label: string }>
    ) => {
        if (Array.isArray(newValue)) {
            handleSelectChange(newValue as { value: string | number; label: string }[]);
        } else if (newValue) {
            handleSelectChange([newValue as { value: string | number; label: string }]);
        } else {
            handleSelectChange([]);
        }
    };
    const animatedComponents = makeAnimated();

    const styles = `select-box${error ? ' invalid' : ''}`;

    return (
        <div className={styles}>
            {label && <label>{label}</label>}
            <Select
                isDisabled={disabled}
                className='select-container'
                classNamePrefix='react-select'
                components={animatedComponents}
                isMulti={multi}
                options={options}
                defaultValue={defaultValue}
                value={value}
                onChange={_handleSelectChange}
                styles={dropdownStyles}
            />
            <span className='invalid-message'>{error && error[0]}</span>
        </div>
    );
};

export default SelectOption;

const dropdownStyles = {
    control: (styles: any, { isFocused }: any) => {
        return {
            ...styles,
            color: '#323232',
            fontFamily: 'Poppins',
            backgroundColor: 'white',
            transition: '0.3s',
            boxShadow: 'none',

            borderColor: isFocused ? '#bdcbd2' : '#e4e6eb',

            ':hover': {
                borderColor: !isFocused ? '#e4e6eb' : '#bdcbd2',
                boxShadow: 'none',
            },
        };
    },
    menu: (styles: any) => {
        return {
            ...styles,
            zIndex: 2,
        };
    },
    option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
        return {
            ...styles,
            color: '#323232',
            fontFamily: 'Poppins',
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                    ? '#eceef3'
                    : isFocused
                        ? '#f8f9fa'
                        : undefined,

            ':hover': {
                ...styles[':hover'],
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? undefined
                        : '#f8f9fa',
            },
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled ? '#eceef3' : undefined,
            },
        };
    },
    indicatorSeparator: (styles: any) => ({
        ...styles,
        display: 'none',
    }),
    dropdownIndicator: (base: any, { isFocused }: any) => ({
        ...base,
        transform: isFocused ? 'rotate(180deg)' : undefined,
        transition: 'transform 0.3s',
    }),
    input: (styles: any) => ({
        ...styles,
        color: '#323232',
    }),
    placeholder: (styles: any) => ({
        ...styles,
        color: '#323232',
    }),
    singleValue: (styles: any) => ({
        ...styles,
        color: '#323232',
        fontFamily: 'Poppins',
    }),
};