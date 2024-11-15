import { ValidationErrors } from 'validatorjs';
import {
    RESET_PASSWORD_CHANGE,
    RESET_PASSWORD_RESET,
    SET_RESET_PASSWORD_FORM_ERRORS
} from './constants';
import { ResetPasswordFormData, ResetPasswordActionTypes } from './interface';
interface ResetPasswordState {
    resetFormData: ResetPasswordFormData;
    formErrors: ValidationErrors;
}

const initialState: ResetPasswordState = {
    resetFormData: {
        password: '',
        confirmPassword: ''
    },
    formErrors: {}
};



const resetPasswordReducer = (
    state: ResetPasswordState = initialState,
    action: ResetPasswordActionTypes
): ResetPasswordState => {
    switch (action.type) {
        case RESET_PASSWORD_CHANGE:
            return {
                ...state,
                resetFormData: { ...state.resetFormData, ...action.payload }
            };
        case SET_RESET_PASSWORD_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.payload
            };
        case RESET_PASSWORD_RESET:
            return {
                ...state,
                resetFormData: {
                    password: '',
                    confirmPassword: ''
                },
                formErrors: {}
            };
        default:
            return state;
    }
};

export default resetPasswordReducer;