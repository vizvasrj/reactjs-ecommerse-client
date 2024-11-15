import React from 'react';
import SearchBar from '../../Common/SearchBar';

interface MerchantSearchProps {
    onSearch: (e: { value: string }) => void;
    onBlur?: () => void;
    onSearchSubmit: () => void;
}

const MerchantSearch: React.FC<MerchantSearchProps> = (props) => {
    return (
        <div className='mb-3'>
            <SearchBar
                name='merchant'
                placeholder='Type email, phone number, brand or status'
                btnText='Search'
                onSearch={props.onSearch}
                onBlur={props.onBlur}
                onSearchSubmit={props.onSearchSubmit}
            />
        </div>
    );
};

export default MerchantSearch;