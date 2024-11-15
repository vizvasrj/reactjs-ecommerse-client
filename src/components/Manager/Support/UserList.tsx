import React from 'react';
import Button from '../../Common/Button';
import { User } from '../../../containers/Users/models';
// interface User {
//     id: number;
//     name: string;
//     online: boolean;
// }

interface UserListProps {
    users: User[];
    selectedUser: User | null;
    selectUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = (props) => {
    const { users, selectedUser, selectUser } = props;
    if (!users) return null;

    const _selectUser = (u: User) => {
        selectUser(u);
    };

    return (
        <ul className='u-list'>
            {users.map((u, i) => {
                const isSelected = selectedUser?._id === u._id;
                const isOnline = u.online ? true : false;

                return (
                    <li className={isSelected ? 'selected' : 'not-selected'} key={i}>
                        <Button
                            variant='none'
                            borderless
                            text={u.name}
                            onClick={() => _selectUser(u)}
                            // disabled={!isOnline}
                            iconDirection='right'
                            icon={
                                <span
                                    className={`circle ${isOnline ? 'online' : 'offline'}`}
                                ></span>
                            }
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default UserList;