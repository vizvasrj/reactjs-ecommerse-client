// src/redux/address/interface.ts
import { FETCH_ADDRESSES, SET_ADDRESS_LOADING, SET_SELECTED_ADDRESS } from './constants';

import { Action } from 'redux';
import { Address } from '../Address/interface';

// export interface Address {
//     _id: string;
//     user: string;
//     firstName: string;
//     lastName: string;
//     address1: string;
//     address2: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     country: string;
//     mobile: string;
//     isDefaultShipping: boolean;
//     isDefaultBilling: boolean;
// }

export interface AddressState {
    addresses: Address[];
    isLoading: boolean;
}

export interface FetchAddressesAction extends Action {
    type: typeof FETCH_ADDRESSES;
    payload: Address[];
}

export interface SetAddressLoadingAction extends Action {
    type: typeof SET_ADDRESS_LOADING;
    payload: boolean;
}

export interface SetSelectedAddressAction extends Action {
    type: typeof SET_SELECTED_ADDRESS;
    payload: Address;
}

export type AddressActionTypes =
    | FetchAddressesAction
    | SetAddressLoadingAction
    | SetSelectedAddressAction;