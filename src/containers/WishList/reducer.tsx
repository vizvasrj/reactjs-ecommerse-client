import { FETCH_WISHLIST, SET_WISHLIST_LOADING } from './constants';
import { WishlistActionTypes } from './interface';
import { Wishlist } from './interface';

interface WishlistState {
    wishlist: Wishlist[];
    isLoading: boolean;
    wishlistForm: any; // Replace 'any' with the type of your wishlist form
}

const initialState: WishlistState = {
    wishlist: [],
    isLoading: false,
    wishlistForm: {}
};

const wishListReducer = (state: WishlistState = initialState, action: WishlistActionTypes) => {
    switch (action.type) {
        case FETCH_WISHLIST:
            return {
                ...state,
                wishlist: action.payload
            };
        case SET_WISHLIST_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
};

export default wishListReducer;