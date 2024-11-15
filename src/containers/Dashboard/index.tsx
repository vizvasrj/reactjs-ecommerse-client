import React, { useEffect } from 'react';
import { RootState } from '../../reducer';
import { ROLES } from '../../constants';
import { isDisabledMerchantAccount } from '../../utils/app';
import Admin from '../../components/Manager/Dashboard/Admin';
import Merchant from '../../components/Manager/Dashboard/Merchant';
import Customer from '../../components/Manager/Dashboard/Customer';
import DisabledMerchantAccount from '../../components/Manager/DisabledAccount/Merchant';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { fetchProfile } from '../Account/action';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { AccountAction } from '../Account/action';
import { toggleDashboardMenu, DashboardActionTypes } from './actions';
import requireAuth from '../Authentication';


const Dashboard: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, AccountAction | DashboardActionTypes>>();
    const user = useSelector((state: RootState) => state.account.user);
    const isLoading = useSelector((state: RootState) => state.account.isLoading);

    useEffect(() => {
        console.log("fetching profile");
        dispatch(fetchProfile());
        console.log("fetching profile done");
    }, [fetchProfile]);

    console.log("user role", user.role);



    if (isDisabledMerchantAccount(user)) {
        return <DisabledMerchantAccount user={user} />;
    }

    return (
        <>
            {isLoading ? (
                <LoadingIndicator inline />
            ) : user.role === ROLES.Admin ? (
                <Admin />
            ) : user.role === ROLES.Merchant && user.merchant ? (
                <Merchant />
            ) : (
                <Customer />
            )}
        </>
    );
};

export default requireAuth(Dashboard);
// export default Dashboard;
