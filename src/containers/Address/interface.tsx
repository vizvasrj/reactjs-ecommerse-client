import { ValidationErrors } from 'validatorjs';
import {
    FETCH_ADDRESS,
    FETCH_ADDRESSES,
    ADDRESS_CHANGE,
    ADDRESS_EDIT_CHANGE,
    SET_ADDRESS_FORM_ERRORS,
    SET_ADDRESS_FORM_EDIT_ERRORS,
    RESET_ADDRESS,
    ADD_ADDRESS,
    REMOVE_ADDRESS,
    SET_ADDRESS_LOADING,
    ADDRESS_SELECT,
    SET_DEFAULT_ADDRESS
} from './constants';

import { Action } from 'redux';

export interface Address {
    _id: string;
    user: string;
    firstName: string;
    lastName: string;
    address: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    mobile: string;
    isDefaultShipping: boolean;
    isDefaultBilling: boolean;
    isDefault: boolean;
}

export interface AddressFormData {
    firstName: string;
    lastName: string;
    address: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    mobile: string;
    isDefault: boolean;
}

export interface AddressState {
    addresses: Address[];
    address: Address | null;
    addressFormData: AddressFormData;
    addressFormErrors: { [key: string]: string };
    addressFormEditErrors: { [key: string]: string };
    selectedAddressId: string | null;
    isLoading: boolean;
    isDefault: boolean;
}

export interface FetchAddressAction extends Action {
    type: typeof FETCH_ADDRESS;
    payload: Address;
}

export interface FetchAddressesAction extends Action {
    type: typeof FETCH_ADDRESSES;
    payload: Address[];
}

export interface AddressChangeAction extends Action {
    type: typeof ADDRESS_CHANGE;
    payload: { [key: string]: any };
}

export interface AddressEditChangeAction extends Action {
    type: typeof ADDRESS_EDIT_CHANGE;
    payload: { [key: string]: any };
}

export interface SetAddressFormErrorsAction extends Action {
    type: typeof SET_ADDRESS_FORM_ERRORS;
    // payload: { [key: string]: string };
    payload: ValidationErrors
}

export interface SetAddressFormEditErrorsAction extends Action {
    type: typeof SET_ADDRESS_FORM_EDIT_ERRORS;
    // payload: { [key: string]: string };
    payload: ValidationErrors
}

export interface ResetAddressAction extends Action {
    type: typeof RESET_ADDRESS;
}

export interface AddAddressAction extends Action {
    type: typeof ADD_ADDRESS;
    payload: Address;
}

export interface RemoveAddressAction extends Action {
    type: typeof REMOVE_ADDRESS;
    payload: string;
}

export interface SetAddressLoadingAction extends Action {
    type: typeof SET_ADDRESS_LOADING;
    payload: boolean;
}

export interface AddressSelectAction extends Action {
    type: typeof ADDRESS_SELECT;
    payload: string;
}

export interface SetDefaultAddressAction extends Action {
    type: typeof SET_DEFAULT_ADDRESS;
    payload: string;
}

export type AddressActionTypes =
    | FetchAddressAction
    | FetchAddressesAction
    | AddressChangeAction
    | AddressEditChangeAction
    | SetAddressFormErrorsAction
    | SetAddressFormEditErrorsAction
    | ResetAddressAction
    | AddAddressAction
    | RemoveAddressAction
    | SetAddressLoadingAction
    | AddressSelectAction
    | SetDefaultAddressAction;