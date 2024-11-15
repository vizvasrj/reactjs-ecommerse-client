import React from 'react';

interface SearchResultMetaProps {
    count: number;
    label: string;
}

const SearchResultMeta: React.FC<SearchResultMetaProps> = ({ count, label }) => {
    return (
        <p className='fw-normal'>
            {count} {label}
        </p>
    );
};

export default SearchResultMeta;
