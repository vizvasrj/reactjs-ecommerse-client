import React, { useState, useEffect, ChangeEvent } from 'react';

import Button from '../Button';

interface SearchBarProps {
    id?: string;
    name?: string;
    placeholder?: string;
    className?: string;
    inlineBtn?: boolean;
    btnText?: string;
    autoComplete?: string;
    onSearch?: (data: { name: string; value: string }) => void;
    onSearchSubmit?: (data: { name: string; value: string }) => void;
    onBlur?: (data: { name: string; value: string }) => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
    const {
        id = 'search',
        name = 'search',
        placeholder = 'Search',
        className = '',
        inlineBtn = true,
        btnText = 'Search',
        autoComplete = 'off',
        onSearch,
        onSearchSubmit,
        onBlur,
        onKeyPress
    } = props;

    const [value, setValue] = useState('');
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setValue(value);
        setTypingTimeout(
            setTimeout(() => {
                if (onSearch) {
                    onSearch({ name, value });
                }
            }, 1000)
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const name = props.name || ''; // Provide a default value if props.name is undefined
        // const value = value;

        if (onSearchSubmit) {
            onSearchSubmit({ name, value });
        }
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        if (onBlur) {
            onBlur({ name, value });
        }
    };

    useEffect(() => {
        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [typingTimeout]);

    const styles = `search-box${inlineBtn ? ` inline-btn-box` : ''}`;
    const classNames = `input-text search-box${className ? ` ${className}` : ''}`;

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className={styles}>
                <div className='input-text-block'>
                    <input
                        autoComplete={autoComplete}
                        type='text'
                        id={id}
                        name={name}
                        className={classNames}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={onKeyPress}
                    />
                    <Button type='submit' variant='primary' text={btnText} />
                </div>
            </div>
        </form>
    );
};


export default SearchBar;