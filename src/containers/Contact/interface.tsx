// src/redux/contact/interface.ts

import { Action } from 'redux';

import {
    CONTACT_FORM_CHANGE,
    SET_CONTACT_FORM_ERRORS,
    CONTACT_FORM_RESET
} from './constants';
import { ValidationErrors } from 'validatorjs';

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface ContactState {
    contactFormData: ContactFormData;
    formErrors: { [key: string]: string };
}

export interface ContactFormChangeAction extends Action {
    type: typeof CONTACT_FORM_CHANGE;
    payload: { [key: string]: any };
}

export interface SetContactFormErrorsAction extends Action {
    type: typeof SET_CONTACT_FORM_ERRORS;
    // payload: { [key: string]: string };
    payload: ValidationErrors
}

export interface ContactFormResetAction extends Action {
    type: typeof CONTACT_FORM_RESET;
}

export type ContactActionTypes =
    | ContactFormChangeAction
    | SetContactFormErrorsAction
    | ContactFormResetAction;