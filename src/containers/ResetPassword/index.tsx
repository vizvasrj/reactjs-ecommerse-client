import React from 'react';
import ResetPasswordForm from '../../components/Common/ResetPasswordForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { ResetPasswordActionTypes } from './interface';
import { useParams } from 'react-router';
import { resetPassword } from './actions';
import { NavigateActionType, navigate } from '../Navigate';
import { resetPasswordChange, } from './actions';
const ResetPassword = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, ResetPasswordActionTypes | NavigateActionType>>();
    const authenticated = useSelector((state: RootState) => state.authentication.authenticated);
    const resetFormData = useSelector((state: RootState) => state.resetPassword.resetFormData);
    const formErrors = useSelector((state: RootState) => state.resetPassword.formErrors);
    const match = useParams<{ token: string }>();
    const handleResetPassword = () => {
        const token = match.token;
        if (token) {
            dispatch(resetPassword(token));
        }
    }


    if (authenticated) {
        dispatch(navigate("/dashboard"));
    }

    const handleResetPasswordChange = (name: string, value: any) => {
        dispatch(resetPasswordChange(name, value));
    }

    return (
        <div className='reset-password-form'>
            <h2>Reset Password</h2>
            <hr />
            <ResetPasswordForm
                isToken
                resetFormData={resetFormData}
                // formErrors={formErrors}
                resetPasswordChange={handleResetPasswordChange}
                resetPassword={() => handleResetPassword()}
            />
        </div>
    );

}

export default ResetPassword;