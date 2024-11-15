import React from 'react';
import { ROLES } from '../../../constants';
import Badge from '../../Common/Badge';

interface UserRoleProps {
    className?: string;
    user: {
        role: string;
    };
}

const UserRole: React.FC<UserRoleProps> = ({ className = '', user }) => {
    return (
        <>
            {user.role === ROLES.Admin ? (
                <Badge variant='primary' className={className}>
                    Admin
                </Badge>
            ) : user.role === ROLES.Merchant ? (
                <Badge variant='dark' className={className}>
                    Merchant
                </Badge>
            ) : (
                <Badge className={className}>Member</Badge>
            )}
        </>
    );
};

export default UserRole;