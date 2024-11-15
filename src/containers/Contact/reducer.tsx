import { ValidationErrors } from 'validatorjs';
import {
    CONTACT_FORM_CHANGE,
    SET_CONTACT_FORM_ERRORS,
    CONTACT_FORM_RESET
} from './constants';
import { ContactActionTypes } from './interface';
import { ContactFormData } from './interface';

interface ContactState {
    contactFormData: ContactFormData;
    formErrors: ValidationErrors;
}

const initialState: ContactState = {
    contactFormData: {
        name: '',
        email: '',
        message: ''
    },
    formErrors: {}
};


const contactReducer = (state: ContactState = initialState, action: ContactActionTypes): ContactState => {
    switch (action.type) {
        case CONTACT_FORM_CHANGE:
            return {
                ...state,
                contactFormData: { ...state.contactFormData, ...action.payload }
            };
        case SET_CONTACT_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.payload
            };
        case CONTACT_FORM_RESET:
            return {
                ...state,
                contactFormData: {
                    name: '',
                    email: '',
                    message: ''
                },
                formErrors: {}
            };
        default:
            return state;
    }
};

export default contactReducer;