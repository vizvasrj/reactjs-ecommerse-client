import { ValidationErrors } from 'validatorjs';
import {
    RESET_PASSWORD_CHANGE,
    RESET_PASSWORD_RESET,
    SET_RESET_PASSWORD_FORM_ERRORS
} from './constants';


import { Action } from 'redux';

export interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

export interface ResetPasswordState {
    resetFormData: ResetPasswordFormData;
    resetPasswordFormErrors: { [key: string]: string };
}

export interface ResetPasswordChangeAction extends Action {
    type: typeof RESET_PASSWORD_CHANGE;
    payload: { [key: string]: any };
    // payload: ValidationErrors

}

export interface ResetPasswordResetAction extends Action {
    type: typeof RESET_PASSWORD_RESET;
}

export interface SetResetPasswordFormErrorsAction extends Action {
    type: typeof SET_RESET_PASSWORD_FORM_ERRORS;
    // payload: { [key: string]: string };
    payload: ValidationErrors
}

export type ResetPasswordActionTypes =
    | ResetPasswordChangeAction
    | ResetPasswordResetAction
    | SetResetPasswordFormErrorsAction;