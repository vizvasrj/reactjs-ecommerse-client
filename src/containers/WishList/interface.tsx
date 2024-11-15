import { FETCH_WISHLIST, SET_WISHLIST_LOADING, UPDATE_WISHLIST } from './constants';

import { Action } from 'redux';

export interface Wishlist {
    _id: string;
    product: {
        _id: string;
        name?: string;
        slug?: string;
        image?: string;
        price?: number;
        quantity?: number;
        imageUrl?: string;
    };
    created: Date;
    isLiked: boolean;
}

export interface WishlistState {
    wishlist: Wishlist[];
    isLoading: boolean;
}

export interface UpdateWishlistAction extends Action {
    type: typeof UPDATE_WISHLIST;
    payload: Wishlist[];
}

export interface FetchWishlistAction extends Action {
    type: typeof FETCH_WISHLIST;
    payload: Wishlist[];
}

export interface SetWishlistLoadingAction extends Action {
    type: typeof SET_WISHLIST_LOADING;
    payload: boolean;
}


export type WishlistActionTypes =
    | UpdateWishlistAction
    | FetchWishlistAction
    | SetWishlistLoadingAction;