import axios from "axios";
import {
    LOGIN_CHANGE,
    LOGIN_RESET,
    SET_LOGIN_LOADING,
    SET_LOGIN_FORM_ERRORS,
    SET_LOGIN_SUBMITTING
} from './constants';
import { setAuth, clearAuth } from "../Authentication/action";
import setToken from "../../utils/token";
import { API_URL } from "../../constants";
import handleError from "../../utils/error";
import { allFieldsValidation } from "../../utils/validation";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../reducer";
import { SetAuthAction, ClearAuthAction } from "../Authentication/action";
import { CLEAR_AUTH, SET_AUTH } from "../Authentication/constants";
import { toast } from "react-toastify";
import toastConfig from "../../utils/toastConfig";
import { navigate, NavigateActionType } from "../Navigate";
// import { redirect } from "react-router";
// import { navigate, NavigateActionType } from "../Navigate";
interface FormData {
    [key: string]: string;
}

interface LoginChangeAction {
    type: typeof LOGIN_CHANGE;
    payload: FormData;
}

export const loginChange = (data: FormData): LoginChangeAction => {

    return {
        type: LOGIN_CHANGE,
        payload: data
    };
};

// Action Interfaces
interface SetLoginFormErrorsAction {
    type: typeof SET_LOGIN_FORM_ERRORS;
    payload: any; // Replace with the type of your errors
}

interface SetLoginSubmittingAction {
    type: typeof SET_LOGIN_SUBMITTING;
    payload: boolean;
}

interface SetLoginLoadingAction {
    type: typeof SET_LOGIN_LOADING;
    payload: boolean;
}

interface LoginResetAction {
    type: typeof LOGIN_RESET;
}

// Combine the action types
export type LoginActionTypes = LoginChangeAction | SetLoginFormErrorsAction | SetLoginSubmittingAction | SetLoginLoadingAction | LoginResetAction | SetAuthAction | ClearAuthAction;

export const login = () => {
    return async (dispatch: ThunkDispatch<RootState, null, LoginActionTypes>, getState: () => RootState) => {
        const rules = {
            email: 'required|email',
            password: 'required|min:6'
        };

        const user = getState().login.loginFormData;

        const { isValid, errors } = allFieldsValidation(user, rules, {
            'required.email': 'Email is required.',
            'email.email': 'Email format is invalid.',
            'required.password': 'Password is required.',
            'min.password': 'Password must be at least 6 characters.'
        });

        console.log("user data", user);

        if (!isValid) {
            return dispatch({ type: SET_LOGIN_FORM_ERRORS, payload: errors });
        }

        dispatch({ type: SET_LOGIN_SUBMITTING, payload: true });
        dispatch({ type: SET_LOGIN_LOADING, payload: true });

        try {
            const response = await axios.post(`${API_URL}/auth/login`, user);

            const firstName = response.data.user.firstName;

            const successfulOptions = {
                title: `Hey${firstName ? ` ${firstName}` : ''}, Welcome Back!`,
                position: 'tr',
                autoDismiss: 1
            };

            localStorage.setItem('token', response.data.token);

            setToken(response.data.token);

            dispatch({ type: SET_AUTH });
            // dispatch(success(successfulOptions));
            toast.success(successfulOptions.title, toastConfig);

            dispatch({ type: LOGIN_RESET });
        } catch (error) {
            const title = `Please try to login again!`;
            handleError(error, dispatch, title);
        } finally {
            dispatch({ type: SET_LOGIN_SUBMITTING, payload: false });
            dispatch({ type: SET_LOGIN_LOADING, payload: false });
        }
    };
};

export const signOut = () => {
    return (dispatch: ThunkDispatch<RootState, null, ClearAuthAction>, getState: () => RootState) => {
        try {
            // const successfulOptions = {
            //     title: `You have signed out!`,
            //     position: 'tr',
            //     autoDismiss: 1
            // };

            // dispatch(clearAuth());
            // console.log("signout here")
            dispatch({ type: CLEAR_AUTH });
            // dispatch(clearAccount());
            // dispatch(push('/login'));
            // const navigate = useNavigate()
            // navigate("/login")

            localStorage.removeItem('token');
            // callback()

            // dispatch(success(successfulOptions));
            // dispatch(clearCart());

        } catch (error: any) {
            // dispatch({type: AUTH_ERROR})
        }
    };
};

export const sendCodeGoogle = (code: string) => {
    return async (dispatch: ThunkDispatch<RootState, null, LoginActionTypes | NavigateActionType>) => {
        try {
            console.log("code", code);
            const response = await axios.post(`${API_URL}/auth/google`, { code });
            console.log("response from setCodeGoogle", response.data);
            const { token, redirect } = response.data;
            localStorage.setItem('token', token);
            setToken(token);

            dispatch({ type: SET_AUTH });


            dispatch({ type: LOGIN_RESET });
            dispatch(navigate(redirect))
        } catch (error) {
            handleError(error, dispatch);
        }
    }
}