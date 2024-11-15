import React from 'react';

import { default as SupportManager } from '../../components/Manager/Support';
import { User } from '../Users/models';
import { useSelector, } from 'react-redux';
import { RootState } from '../../reducer';
import requireAuth from '../Authentication';

const Support = () => {
    const user = useSelector((state: RootState) => state.account.user) as User;

    return (
        <div className='support'>
            <h3>Support</h3>
            <hr />
            <div className='mt-5'>
                <SupportManager user={user} />
            </div>
        </div>
    );
}

// const mapStateToProps = (state: any) => {
//     return {
//         user: state.account.user,
//         resetFormData: state.resetPassword.resetFormData,
//         formErrors: state.resetPassword.formErrors
//     };
// };

export default requireAuth(Support);