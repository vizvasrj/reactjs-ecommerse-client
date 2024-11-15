import React from 'react';

import SearchBar from '../../Common/SearchBar';

interface OrderSearchProps {
    onSearch: (data: { name: string; value: string }) => void;
    onSearchSubmit: (filter: { value: string }) => void;
}


const OrderSearch: React.FC<OrderSearchProps> = ({
    onSearch,
    onSearchSubmit
}) => {
    return (
        <div className='mb-3'>
            <SearchBar
                name='order'
                placeholder='Type the complete order ID'
                btnText='Search'
                onSearch={onSearch}
                onSearchSubmit={onSearchSubmit}
            />
        </div>
    );
};

export default OrderSearch;