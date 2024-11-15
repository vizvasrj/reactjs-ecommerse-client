import React from 'react';
import SearchBar from '../../Common/SearchBar';

interface UserSearchProps {
    onSearch: (data: { name: string; value: string; }) => void;
    onBlur?: () => void;
    onSearchSubmit: () => void;
}

const UserSearch: React.FC<UserSearchProps> = (props) => {
    return (
        <div className='mb-3'>
            <SearchBar
                name='user'
                placeholder='Type user name or email'
                btnText='Search'
                onSearch={props.onSearch}
                onBlur={props.onBlur}
                onSearchSubmit={props.onSearchSubmit}
            />
        </div>
    );
};

export default UserSearch;