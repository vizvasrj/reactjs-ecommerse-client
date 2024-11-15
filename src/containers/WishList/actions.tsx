import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import { FETCH_WISHLIST, SET_WISHLIST_LOADING } from './constants';
import handleError from '../../utils/error';
import { API_URL } from '../../constants';
import { RootState } from '../../reducer';

import {
    WishlistActionTypes,
    UpdateWishlistAction,
    FetchWishlistAction,
    SetWishlistLoadingAction,
} from './interface';
import { toast } from 'react-toastify';
import toastConfig from '../../utils/toastConfig';

export const updateWishlist = (isLiked: boolean, productId: string) => {
    return async (dispatch: ThunkDispatch<RootState, null, WishlistActionTypes>, getState: () => RootState) => {
        try {
            if (getState().authentication.authenticated === true) {
                const response = await axios.post(`${API_URL}/wishlist`, {
                    isLiked,
                    product: productId
                });

                const successfulOptions = {
                    title: `${response.data.message}`,
                    position: 'tr',
                    autoDismiss: 1
                };

                if (response.data.success === true) {
                    // dispatch(success(successfulOptions));
                    toast.success(successfulOptions.title, toastConfig);
                    dispatch(fetchWishlist());
                }
            } else {
                const retryOptions = {
                    title: `Please login to wishlist a product`,
                    position: 'tr',
                    autoDismiss: 1
                };
                // dispatch(warning(retryOptions));
                toast.warning(retryOptions.title, toastConfig);
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// fetch wishlist api
export const fetchWishlist = () => {
    return async (dispatch: ThunkDispatch<RootState, null, WishlistActionTypes>) => {
        try {
            dispatch<SetWishlistLoadingAction>({ type: SET_WISHLIST_LOADING, payload: true });

            const response = await axios.get(`${API_URL}/wishlist`);

            dispatch<FetchWishlistAction>({ type: FETCH_WISHLIST, payload: response.data.wishlist });
        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch<SetWishlistLoadingAction>({ type: SET_WISHLIST_LOADING, payload: false });
        }
    };
};