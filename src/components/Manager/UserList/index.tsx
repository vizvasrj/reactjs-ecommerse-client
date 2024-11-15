import { formatDate } from '../../../utils/date';
import React from 'react';

import UserRole from '../UserRole';

import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../reducer';
import { User } from '../../../containers/Users/models';

type UserListProps = {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    // const { users } = useSelector((state: RootState) => state.user);

    return (
        <div className='u-list'>
            {users.map((user, index) => (
                <div key={index} className='mt-3 px-4 py-3 user-box'>
                    <label className='text-black'>Name</label>
                    <p className='fw-medium'>
                        {user?.firstName ? `${user?.firstName} ${user?.lastName}` : 'N/A'}
                    </p>
                    <label className='text-black'>Email</label>
                    <p>{user?.email ?? '-'}</p>
                    <label className='text-black'>Provider</label>
                    <p>{user?.provider}</p>
                    <label className='text-black'>Account Created</label>
                    <p>{formatDate(user?.created)}</p>
                    <label className='text-black'>Role</label>
                    <p className='mb-0'>
                        <UserRole user={user} className='d-inline-block mt-2' />
                    </p>
                </div>
            ))}
        </div>
    );
}

export default UserList;