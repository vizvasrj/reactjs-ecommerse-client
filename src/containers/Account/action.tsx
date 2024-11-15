import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import {
    ACCOUNT_CHANGE,
    FETCH_PROFILE,
    CLEAR_ACCOUNT,
    SET_PROFILE_LOADING
} from './constants';
import handleError from '../../utils/error';
import { API_URL } from '../../constants';
import { toast } from "react-toastify";
import { RootState } from '../../reducer';
import { User } from './interface';

interface AccountChangeAction {
    type: typeof ACCOUNT_CHANGE;
    payload: { [key: string]: any };
}

interface ClearAccountAction {
    type: typeof CLEAR_ACCOUNT;
}

interface SetProfileLoadingAction {
    type: typeof SET_PROFILE_LOADING;
    payload: boolean;
}

interface FetchProfileAction {
    type: typeof FETCH_PROFILE;
    payload: User;
}

export type AccountAction =
    | AccountChangeAction
    | ClearAccountAction
    | SetProfileLoadingAction
    | FetchProfileAction;

export const accountChange = (name: string, value: any): AccountChangeAction => {
    let formData = {} as any;
    formData[name] = value;

    return {
        type: ACCOUNT_CHANGE,
        payload: formData
    };
};

export const clearAccount = (): ClearAccountAction => {
    return {
        type: CLEAR_ACCOUNT
    };
};

export const setProfileLoading = (value: boolean): SetProfileLoadingAction => {
    console.log("setProfileLoading", value);
    return {
        type: SET_PROFILE_LOADING,
        payload: value
    };
};

export const fetchProfile = () => {
    return async (dispatch: ThunkDispatch<RootState, any, SetProfileLoadingAction | FetchProfileAction>, getState: () => RootState) => {
        try {
            dispatch(setProfileLoading(true));
            const response = await axios.get(`${API_URL}/user/me`);

            dispatch({ type: FETCH_PROFILE, payload: response.data.user });
        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch(setProfileLoading(false));
        }
    };
};


export const updateProfile = () => {
    return async (dispatch: ThunkDispatch<RootState, any, FetchProfileAction>, getState: () => RootState) => {
        const profile = getState().account.user;

        try {
            const response = await axios.put(`${API_URL}/user`, {
                firstName: profile.firstName,
                lastName: profile.lastName,
                phoneNumber: profile.phoneNumber
            });

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            dispatch({ type: FETCH_PROFILE, payload: response.data.user });

            toast.success(successfulOptions.title, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })

        } catch (error) {
            handleError(error, dispatch);
        }
    };
};