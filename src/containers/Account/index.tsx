import React from 'react';


import AccountDetails from '../../components/Manager/AccountDetails';
import SubPage from '../../components/Manager/SubPage';
import { User } from './interface';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { accountChange, updateProfile } from './action';
import { AccountAction } from './action';


// interface AccountProps {
//     user: User;
// }

const Account: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.account);

    const dispatch = useDispatch<ThunkDispatch<RootState, any, AccountAction>>();

    const handleAaccountChange = (name: string, value: any) => {
        dispatch(accountChange(name, value));
    }

    const handleUpdateProfile = () => {
        dispatch(updateProfile());
    }


    return (
        <div className='account' >
            <SubPage title={'Account Details'}
            // isMenuOpen={null}
            >
                <AccountDetails
                    user={user}
                    accountChange={handleAaccountChange}
                    updateProfile={handleUpdateProfile}
                />
            </SubPage>
        </div>
    );
}


export default Account;