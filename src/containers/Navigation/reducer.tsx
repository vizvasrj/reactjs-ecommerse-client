import { NavigationState } from "./interface";
import { NavigationActionTypes } from "./interface";
import {
    TOGGLE_MENU,
    TOGGLE_CART,
    TOGGLE_BRAND,
    SEARCH_CHANGE,
    SUGGESTIONS_FETCH_REQUEST,
    SUGGESTIONS_CLEAR_REQUEST
} from './constants';

// interface State {
//     isMenuOpen: boolean;
//     isCartOpen: boolean;
//     isBrandOpen: boolean;
//     searchValue: string;
//     searchSuggestions: string[];
// }

const initialState: NavigationState = {
    isMenuOpen: false,
    isCartOpen: false,
    isBrandOpen: false,
    searchValue: '',
    searchSuggestions: []
};




const navigationReducer = (state: NavigationState = initialState, action: NavigationActionTypes) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen,
                isCartOpen: false
            };
        case TOGGLE_CART:
            return {
                ...state,
                isCartOpen: !state.isCartOpen,
                isMenuOpen: false
            };
        case TOGGLE_BRAND:
            return {
                ...state,
                isBrandOpen: !state.isBrandOpen
            };
        case SEARCH_CHANGE:
            return {
                ...state,
                searchValue: action.payload
            };
        case SUGGESTIONS_FETCH_REQUEST:
            return {
                ...state,
                searchSuggestions: action.payload
            };
        case SUGGESTIONS_CLEAR_REQUEST:
            return {
                ...state,
                searchSuggestions: action.payload
            };
        default:
            return state;
    }
};

export default navigationReducer;