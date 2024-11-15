import { success } from 'react-notification-system-redux';
import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import {
    RESET_PASSWORD_CHANGE,
    RESET_PASSWORD_RESET,
    SET_RESET_PASSWORD_FORM_ERRORS
} from './constants';

import { signOut } from '../Login/actions';
import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import { API_URL } from '../../constants';
import { RootState } from '../../reducer';

import {
    ResetPasswordState,
    ResetPasswordFormData,
    ResetPasswordChangeAction,
    ResetPasswordResetAction,
    SetResetPasswordFormErrorsAction,
    ResetPasswordActionTypes
} from './interface';
import { LoginActionTypes } from '../Login/actions';
import { ClearAuthAction } from '../Authentication/action';
import { navigate, NavigateActionType } from '../Navigate';
import { toast } from 'react-toastify';
import toastConfig from '../../utils/toastConfig';
export const resetPasswordChange = (name: string, value: any): ResetPasswordChangeAction => {
    let formData: any = {};
    formData[name] = value;

    return {
        type: RESET_PASSWORD_CHANGE,
        payload: formData
    };
};

export const resetPassword = (token: string) => {
    return async (dispatch: ThunkDispatch<RootState, null, ResetPasswordActionTypes | NavigateActionType>, getState: () => RootState) => {
        try {
            const rules = {
                password: 'required|min:6',
                confirmPassword: 'required|min:6|same:password'
            };
            const user = getState().resetPassword.resetFormData;

            const { isValid, errors } = allFieldsValidation(user, rules, {
                'required.password': 'Password is required.',
                'min.password': 'Password must be at least 6 characters.',
                'required.confirmPassword': 'Confirm password is required.',
                'min.confirmPassword':
                    'Confirm password must be at least 6 characters.',
                'same.confirmPassword':
                    'Confirm password and password fields must match.'
            });

            if (!isValid && errors) {
                return dispatch<SetResetPasswordFormErrorsAction>({
                    type: SET_RESET_PASSWORD_FORM_ERRORS,
                    payload: errors
                });
            }

            const response = await axios.post(`${API_URL}/auth/reset/${token}`, user);
            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                // dispatch(push('/login'));
                dispatch(navigate("/login"));
            }

            // dispatch(success(successfulOptions));
            toast.success(successfulOptions.title, toastConfig);
            dispatch<ResetPasswordResetAction>({ type: RESET_PASSWORD_RESET });
        } catch (error) {
            const title = `Please try to reset again!`;
            handleError(error, dispatch, title);
        }
    };
};

export const resetAccountPassword = () => {
    return async (dispatch: ThunkDispatch<RootState, null, ResetPasswordActionTypes | ClearAuthAction>, getState: () => RootState) => {
        try {
            const rules = {
                password: 'required|min:6',
                confirmPassword: 'required|min:6'
            };

            const user = getState().resetPassword.resetFormData;

            const { isValid, errors } = allFieldsValidation(user, rules, {
                'required.password': 'Password is required.',
                'min.password': 'Password must be at least 6 characters.',
                'required.confirmPassword': 'Confirm password is required.',
                'min.confirmPassword': 'Confirm password must be at least 6 characters.'
            });

            if (!isValid && errors) {
                return dispatch<SetResetPasswordFormErrorsAction>({
                    type: SET_RESET_PASSWORD_FORM_ERRORS,
                    payload: errors
                });
            }

            const response = await axios.post(`${API_URL}/auth/reset`, user);
            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                // dispatch(signOut());
                dispatch(signOut());
            }

            // dispatch(success(successfulOptions));
            toast.success(successfulOptions.title, toastConfig);
            dispatch<ResetPasswordResetAction>({ type: RESET_PASSWORD_RESET });
        } catch (error) {
            const title = `Please try to reset again!`;
            handleError(error, dispatch, title);
        }
    };
};