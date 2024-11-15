import {
    TOGGLE_MENU,
    TOGGLE_CART,
    TOGGLE_BRAND,
    SEARCH_CHANGE,
    SUGGESTIONS_FETCH_REQUEST,
    SUGGESTIONS_CLEAR_REQUEST
} from './constants';

import { Action } from 'redux';
import { Product } from '../Product/interface';

export interface NavigationState {
    isMenuOpen: boolean;
    isCartOpen: boolean;
    isBrandOpen: boolean;
    searchValue: string;
    searchSuggestions: Product[];
}

export interface ToggleMenuAction extends Action {
    type: typeof TOGGLE_MENU;
}

export interface ToggleCartAction extends Action {
    type: typeof TOGGLE_CART;
}

export interface ToggleBrandAction extends Action {
    type: typeof TOGGLE_BRAND;
}

export interface SearchChangeAction extends Action {
    type: typeof SEARCH_CHANGE;
    payload: string;
}

export interface SuggestionsFetchRequestAction extends Action {
    type: typeof SUGGESTIONS_FETCH_REQUEST;
    payload: Product[];
}

export interface SuggestionsClearRequestAction extends Action {
    type: typeof SUGGESTIONS_CLEAR_REQUEST;
    payload: Product[];
}

export type NavigationActionTypes =
    | ToggleMenuAction
    | ToggleCartAction
    | ToggleBrandAction
    | SearchChangeAction
    | SuggestionsFetchRequestAction
    | SuggestionsClearRequestAction;