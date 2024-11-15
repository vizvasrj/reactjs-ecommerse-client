import { API_URL } from '../../constants';
import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import { FETCH_ADDRESSES, SET_ADDRESS_LOADING } from './constants';
import handleError from '../../utils/error';
import { RootState } from '../../reducer';

import {
    AddressState,
    FetchAddressesAction,
    SetAddressLoadingAction,
    AddressActionTypes
} from './interface';

export const fetchAddresses = () => {
    return async (dispatch: ThunkDispatch<RootState, null, AddressActionTypes>) => {
        try {
            // console.log("fetchAddresses from actions");
            dispatch(setAddressLoading(true));

            const response = await axios.get(`${API_URL}/address`);
            // console.log("fetchAddresses response", response.data.addresses);

            dispatch<FetchAddressesAction>({ type: FETCH_ADDRESSES, payload: response.data.addresses });

        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch(setAddressLoading(false));
        }
    };
};

export const setAddressLoading = (value: boolean): SetAddressLoadingAction => {
    return {
        type: SET_ADDRESS_LOADING,
        payload: value
    };
};