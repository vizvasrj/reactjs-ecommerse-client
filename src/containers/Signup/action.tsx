import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducer";
import { setAuth } from "../Authentication/action";
import setToken from "../../utils/token";
import { API_URL } from "../../constants";
import { allFieldsValidation } from "../../utils/validation";
import { SIGNUP_CHANGE, SUBSCRIBE_CHANGE, SET_SIGNUP_FORM_ERRORS, SET_SIGNUP_SUBMITTING, SET_SIGNUP_LOADING, SIGNUP_RESET } from "./constants";
import axios from "axios";
import { SET_AUTH } from "../Authentication/constants";
import { SetAuthAction } from "../Authentication/action";
import { toast } from 'react-toastify';
import { Notification } from 'react-notification-system';
import handleError from "../../utils/error";
interface FormData {
    [key: string]: string;
}

interface SignupChangeAction {
    type: typeof SIGNUP_CHANGE;
    payload: FormData;
}

interface SubscribeChangeAction {
    type: typeof SUBSCRIBE_CHANGE;
}

interface SetSignupFormErrorsAction {
    type: typeof SET_SIGNUP_FORM_ERRORS;
    payload: any; // Replace 'any' with the actual type of your errors
}

interface SetSignupSubmittingAction {
    type: typeof SET_SIGNUP_SUBMITTING;
    payload: boolean;
}

interface SetSignupLoadingAction {
    type: typeof SET_SIGNUP_LOADING;
    payload: boolean;
}

interface SetSignupResetAction {
    type: typeof SIGNUP_RESET;
}

export type SignupActionTypes = SignupChangeAction | SubscribeChangeAction | SetSignupFormErrorsAction | SetSignupSubmittingAction | SetSignupLoadingAction | SetAuthAction | SetSignupResetAction;

export const signupChange = (data: FormData): SignupChangeAction => {
    return {
        type: SIGNUP_CHANGE,
        payload: data,
    };
}

export const subscribeChange = (): SubscribeChangeAction => {
    return {
        type: SUBSCRIBE_CHANGE,
    };
}

export const signUp = () => {
    return async (dispatch: ThunkDispatch<RootState, null, SignupActionTypes>, getState: () => RootState) => {
        try {
            const roles = {
                email: 'required|email',
                password: 'required|min:6',
                firstName: 'required',
                lastName: 'required'
            };

            const newUser = getState().signup?.signupFormData;
            const isSubscribed = getState().signup?.isSubscribed;
            if (newUser) {
                const { isValid, errors } = allFieldsValidation(newUser, roles, {
                    'required.email': 'Email is required.',
                    'required.password': 'Password is required.',
                    'required.firstName': 'First Name is required.',
                    'required.lastName': 'Last Name is required.'
                });

                if (!isValid) {
                    dispatch({ type: SET_SIGNUP_FORM_ERRORS, payload: errors });
                    return;
                }
                dispatch({ type: SET_SIGNUP_SUBMITTING, payload: true });
                dispatch({ type: SET_SIGNUP_LOADING, payload: true });

                const user = {
                    isSubscribed,
                    ...newUser
                };

                console.log("SENDING REQUEST TO REGISTER USER", user);
                console.log("API URL", API_URL);
                const response = await axios.post(`${API_URL}/auth/register`, user);

                const successfulOptions: Notification = {
                    title: `You have signed up successfully! You will be receiving an email as well. Thank you!`,
                    position: 'tr',
                    autoDismiss: 1
                };

                localStorage.setItem('token', response.data.token);
                setToken(response.data.token);
                dispatch({ type: SET_AUTH });
                toast.success(successfulOptions.title, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch({ type: SIGNUP_RESET });

            }
        } catch (error) {
            handleError(error, dispatch, 'Signup Error');
        } finally {
            dispatch({ type: SET_SIGNUP_SUBMITTING, payload: false });
            dispatch({ type: SET_SIGNUP_LOADING, payload: false });
        }
    }
}