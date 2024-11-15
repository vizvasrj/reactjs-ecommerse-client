import { FETCH_ADDRESSES, SET_ADDRESS_LOADING, SET_SELECTED_ADDRESS } from "./constants";

import { Address } from "../Address/interface";

interface OrderAddressState {
    addresses: Address[];
    selectedAddress: Address | null;
    loading: boolean;
}

const initialState: OrderAddressState = {
    addresses: [],
    selectedAddress: null,
    loading: false,
};

import { AddressActionTypes } from "./interface";

const orderAddressReducer = (state = initialState, action: AddressActionTypes): OrderAddressState => {
    switch (action.type) {
        case FETCH_ADDRESSES:
            return {
                ...state,
                addresses: action.payload,
            };
        // Handle other actions...
        case SET_ADDRESS_LOADING:
            return {
                ...state,
                loading: action.payload,
            };

        case SET_SELECTED_ADDRESS:
            return {
                ...state,
                selectedAddress: action.payload,
            };

        default:
            return state;
    }
};

export default orderAddressReducer;