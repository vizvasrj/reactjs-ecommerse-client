import React, { useState } from 'react';

export interface RadioProps {
    handleChangeSubmit: (name: string, value: string) => void;
}

const Radio: React.FC<RadioProps> = ({ handleChangeSubmit }) => {
    const [size, setSize] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSize(value);
        handleChangeSubmit(name, value);
    };

    return (
        <div>
            <ul>
                <li>
                    <label>
                        <input
                            name="sorting"
                            type="radio"
                            value="Newest First"
                            checked={size === 'Newest First'}
                            onChange={handleChange}
                        />
                        Newest First
                    </label>
                </li>

                <li>
                    <label>
                        <input
                            name="sorting"
                            type="radio"
                            value="Price High to Low"
                            checked={size === 'Price High to Low'}
                            onChange={handleChange}
                        />
                        Price High to Low
                    </label>
                </li>

                <li>
                    <label>
                        <input
                            name="sorting"
                            type="radio"
                            value="Price Low to High"
                            checked={size === 'Price Low to High'}
                            onChange={handleChange}
                        />
                        Price Low to High
                    </label>
                </li>
            </ul>
        </div>
    );
};

export default Radio;