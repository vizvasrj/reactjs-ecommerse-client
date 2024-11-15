import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import ResetPasswordForm from '../../components/Common/ResetPasswordForm';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { resetPasswordChange, resetAccountPassword } from '../ResetPassword/actions';
import { ResetPasswordActionTypes } from '../ResetPassword/interface';

const AccountSecurity: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, ResetPasswordActionTypes>>();


    const handleResetPasswordChange = (name: string, value: any) => {
        dispatch(resetPasswordChange(name, value));
    }
    const resetFormData = useSelector((state: RootState) => state.resetPassword.resetFormData);
    const formErrors = useSelector((state: RootState) => state.resetPassword.formErrors);
    const handleResetPassword = () => {
        dispatch(resetAccountPassword());
    }
    return (
        <div className='account-security'>
            <SubPage title={'Account Security'}
            // isMenuOpen={null}
            >
                <div className='reset-form'>
                    <h4>Reset Password</h4>
                    <ResetPasswordForm
                        isToken={false}
                        resetFormData={resetFormData}
                        // formErrors={formErrors}
                        resetPasswordChange={handleResetPasswordChange}
                        resetPassword={handleResetPassword}
                    />
                </div>
            </SubPage>
        </div>
    );
}


export default AccountSecurity;