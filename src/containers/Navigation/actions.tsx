import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import handleError from '../../utils/error';
import {
    TOGGLE_MENU,
    TOGGLE_CART,
    TOGGLE_BRAND,
    SEARCH_CHANGE,
    SUGGESTIONS_FETCH_REQUEST,
    SUGGESTIONS_CLEAR_REQUEST
} from './constants';
import { API_URL } from '../../constants';
import { RootState } from '../../reducer';


import {
    ToggleMenuAction,
    ToggleCartAction,
    ToggleBrandAction,
    SearchChangeAction,
    SuggestionsFetchRequestAction,
    SuggestionsClearRequestAction,
    NavigationActionTypes
} from './interface';

export const toggleMenu = (): ToggleMenuAction => {
    return {
        type: TOGGLE_MENU
    };
};

export const toggleCart = (): ToggleCartAction => {
    return {
        type: TOGGLE_CART
    };
};

export const toggleBrand = (): ToggleBrandAction => {
    return {
        type: TOGGLE_BRAND
    };
};

export const onSearch = (v: string): SearchChangeAction => {
    return {
        type: SEARCH_CHANGE,
        payload: v
    };
};

export const onSuggestionsFetchRequested = (value: { value: string }) => {
    const inputValue = value.value.trim().toLowerCase();

    return async (dispatch: ThunkDispatch<RootState, null, NavigationActionTypes>) => {
        try {
            if (inputValue && inputValue.length % 3 === 0) {
                const response = await axios.get(`${API_URL}/product/list/search/${inputValue}`);

                dispatch<SuggestionsFetchRequestAction>({
                    type: SUGGESTIONS_FETCH_REQUEST,
                    payload: response.data.products
                });
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

export const onSuggestionsClearRequested = (): SuggestionsClearRequestAction => {
    return {
        type: SUGGESTIONS_CLEAR_REQUEST,
        payload: []
    };
};