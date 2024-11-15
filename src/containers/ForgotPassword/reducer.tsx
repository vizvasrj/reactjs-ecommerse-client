import {
    FORGOT_PASSWORD_CHANGE,
    FORGOT_PASSWORD_RESET,
    SET_FORGOT_PASSWORD_FORM_ERRORS
} from './constants';
import { ForgotPasswordFormData } from './interface';

interface ForgotPasswordState {
    forgotFormData: ForgotPasswordFormData;
    formErrors: Record<string, string>;
}

const initialState: ForgotPasswordState = {
    forgotFormData: {
        email: ''
    },
    formErrors: {}
};

type ForgotPasswordAction = {
    type: string;
    payload: any;
};

const forgotPasswordReducer = (
    state: ForgotPasswordState = initialState,
    action: ForgotPasswordAction
): ForgotPasswordState => {
    switch (action.type) {
        case FORGOT_PASSWORD_CHANGE:
            return {
                ...state,
                forgotFormData: {
                    email: action.payload
                }
            };
        case SET_FORGOT_PASSWORD_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.payload
            };
        case FORGOT_PASSWORD_RESET:
            return {
                ...state,
                forgotFormData: {
                    email: ''
                }
            };
        default:
            return state;
    }
};

export default forgotPasswordReducer;