import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import {
    CONTACT_FORM_CHANGE,
    SET_CONTACT_FORM_ERRORS,
    CONTACT_FORM_RESET
} from './constants';

import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import { API_URL } from '../../constants';
import { RootState } from '../../reducer';

import {
    ContactFormData,
    ContactFormChangeAction,
    SetContactFormErrorsAction,
    ContactFormResetAction,
    ContactActionTypes
} from './interface';
import { toast } from 'react-toastify';
import toastConfig from '../../utils/toastConfig';

export const contactFormChange = (name: string, value: any): ContactFormChangeAction => {
    let formData: any = {};
    formData[name] = value;

    return {
        type: CONTACT_FORM_CHANGE,
        payload: formData
    };
};

export const contactUs = () => {
    return async (dispatch: ThunkDispatch<RootState, null, ContactActionTypes>, getState: () => RootState) => {
        try {
            const rules = {
                name: 'required',
                email: 'required|email',
                message: 'required|min:10'
            };

            const contact = getState().contact.contactFormData;

            const { isValid, errors } = allFieldsValidation(contact, rules, {
                'required.name': 'Name is required.',
                'required.email': 'Email is required.',
                'email.email': 'Email format is invalid.',
                'required.message': 'Message is required.',
                'min.message': 'Message must be at least 10 characters.'
            });

            if (!isValid && errors) {
                return dispatch<SetContactFormErrorsAction>({ type: SET_CONTACT_FORM_ERRORS, payload: errors });
            }

            const response = await axios.post(`${API_URL}/contact/add`, contact);

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            dispatch<ContactFormResetAction>({ type: CONTACT_FORM_RESET });
            // dispatch(success(successfulOptions));
            toast.success(successfulOptions.title, toastConfig);
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};