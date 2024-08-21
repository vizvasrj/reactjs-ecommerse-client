import { SET_AUTH, CLEAR_AUTH } from './constants';

export type SetAuthAction = {
    type: typeof SET_AUTH
}

export type ClearAuthAction = {
    type: typeof CLEAR_AUTH
}

export const setAuth = (): SetAuthAction => {
    return {
        type: SET_AUTH,
    };
}

export const clearAuth = (): ClearAuthAction => {
    return {
        type: CLEAR_AUTH,
    };
}