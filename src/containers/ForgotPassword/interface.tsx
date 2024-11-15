import { ValidationErrors } from 'validatorjs';
import {
    FORGOT_PASSWORD_CHANGE,
    FORGOT_PASSWORD_RESET,
    SET_FORGOT_PASSWORD_FORM_ERRORS
} from './constants';

import { Action } from 'redux';

export interface ForgotPasswordFormData {
    email: string;
}

export interface ForgotPasswordState {
    forgotFormData: ForgotPasswordFormData;
    forgotPasswordFormErrors: { [key: string]: string };
}

export interface ForgotPasswordChangeAction extends Action {
    type: typeof FORGOT_PASSWORD_CHANGE;
    payload: any; // You might want to make this more specific if you have other data in your form
}

export interface ForgotPasswordResetAction extends Action {
    type: typeof FORGOT_PASSWORD_RESET;
}

export interface SetForgotPasswordFormErrorsAction extends Action {
    type: typeof SET_FORGOT_PASSWORD_FORM_ERRORS;
    // payload: { [key: string]: string };
    payload: ValidationErrors
}

export type ForgotPasswordActionTypes =
    | ForgotPasswordChangeAction
    | ForgotPasswordResetAction
    | SetForgotPasswordFormErrorsAction;