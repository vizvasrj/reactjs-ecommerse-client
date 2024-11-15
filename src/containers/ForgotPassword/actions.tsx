import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import {
    FORGOT_PASSWORD_CHANGE,
    FORGOT_PASSWORD_RESET,
    SET_FORGOT_PASSWORD_FORM_ERRORS
} from './constants';

import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import { API_URL } from '../../constants';
import { RootState } from '../../reducer';

import {
    ForgotPasswordChangeAction,
    ForgotPasswordResetAction,
    SetForgotPasswordFormErrorsAction,
    ForgotPasswordActionTypes
} from './interface';
import { navigate, NavigateActionType } from "../Navigate";
import { toast } from 'react-toastify';
import toastConfig from '../../utils/toastConfig';

export const forgotPasswordChange = (name: string, value: any): ForgotPasswordChangeAction => {
    return {
        type: FORGOT_PASSWORD_CHANGE,
        payload: value
    };
};

export const forgotPassword = () => {
    return async (dispatch: ThunkDispatch<RootState, null, ForgotPasswordActionTypes | NavigateActionType>, getState: () => RootState) => {
        try {
            const rules = {
                email: 'required|email'
            };

            const user = getState().forgotPassword.forgotFormData;

            const { isValid, errors } = allFieldsValidation(user, rules, {
                'required.email': 'Email is required.'
            });

            if (!isValid && errors) {
                return dispatch<SetForgotPasswordFormErrorsAction>({
                    type: SET_FORGOT_PASSWORD_FORM_ERRORS,
                    payload: errors
                });
            }

            const response = await axios.post(`${API_URL}/auth/forgot`, user);
            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                // dispatch(push('/login'));
                dispatch(navigate('/login'));
            }
            // dispatch(success(successfulOptions));
            toast.success(successfulOptions.title, toastConfig);

            dispatch<ForgotPasswordResetAction>({ type: FORGOT_PASSWORD_RESET });
        } catch (error) {
            const title = `Please try again!`;
            handleError(error, dispatch, title);
        }
    };
};