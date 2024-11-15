import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
// import actions from '../../actions';
import UserList from '../../components/Manager/UserList';
import UserSearch from '../../components/Manager/UserSearch';
import SubPage from '../../components/Manager/SubPage';
import SearchResultMeta from '../../components/Manager/SearchResultMeta';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import Pagination from '../../components/Common/Pagination';
import { RootState } from '../../reducer';
import { fetchUsers, searchUsers, UserActionTypes } from './actions';


const Users: React.FC = () => {
    const users = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<ThunkDispatch<RootState, null, UserActionTypes>>();

    useEffect(() => {
        dispatch(fetchUsers(null));
    }, []);


    const [search, setSearch] = useState('');


    const handleUserSearch = (data: { name: string; value: string; }) => {
        const { value } = data;
        if (value.length >= 2) {
            dispatch(searchUsers({ value }));
            setSearch(value);
        } else {
            setSearch('');
        }
    };

    const handleOnPagination = (type: string, page: number) => {
        // You might need to update the body of this function
        // to handle the `type` and `page` parameters correctly.
        dispatch(fetchUsers(page));
    };

    const handleUserSearchSubmit = () => {
        dispatch(searchUsers({ value: search }));
    };

    const isSearch = search.length > 0;
    const filteredUsers = search ? users.searchedUsers : users.users;
    const displayPagination = users.advancedFilters.totalPages > 1;
    const displayUsers = filteredUsers && filteredUsers.length > 0;

    return (
        <div className='users-dashboard'>
            <SubPage title='Users' />
            <UserSearch onSearch={handleUserSearch} onSearchSubmit={handleUserSearchSubmit} />
            {users.isLoading && <LoadingIndicator />}
            {displayUsers && (
                <>
                    {!isSearch && displayPagination && (
                        <Pagination
                            totalPages={users.advancedFilters.totalPages}
                            onPagination={handleOnPagination}
                        />
                    )}
                    <SearchResultMeta
                        label='users'
                        count={isSearch ? filteredUsers.length : users.advancedFilters.count}
                    />
                    <UserList users={filteredUsers} />
                </>
            )}
            {!users.isLoading && !displayUsers && <NotFound message='No users found.' />}
        </div>
    );
};


export default Users;