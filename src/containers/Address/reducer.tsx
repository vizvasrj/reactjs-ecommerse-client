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
    SET_DEFAULT_ADDRESS
} from './constants';

// interface Address {
//     _id: string;
//     address: string;
//     city: string;
//     state: string;
//     country: string;
//     zipCode: string;
//     isDefault: boolean;
// }

import { Address } from './interface';


// interface AddressFormData {
//     address: string;
//     city: string;
//     state: string;
//     country: string;
//     zipCode: string;
//     isDefault: boolean;
// }

import { AddressFormData } from './interface';


export interface FormErrors {
    [key: string]: string;
}

interface State {
    addresses: Address[];
    addressFormData: AddressFormData;
    address: Partial<Address>;
    formErrors: FormErrors;
    editFormErrors: FormErrors;
    isLoading?: boolean;
    isDefault: boolean;
    defaultAddress: Address;
}

const initialState: State = {
    addresses: [] as Address[],
    addressFormData: {
        address: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        isDefault: false,

    } as AddressFormData,
    address: {
        _id: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        isDefault: false
    } as Partial<Address>,
    formErrors: {},
    editFormErrors: {},
    isDefault: false,
    defaultAddress: {} as Address,
};

const addressReducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case FETCH_ADDRESSES:
            return {
                ...state,
                addresses: action.payload
            };
        case FETCH_ADDRESS:
            return {
                ...state,
                address: action.payload,
                editFormErrors: {}
            };
        case ADD_ADDRESS:
            return {
                ...state,
                addresses: [...state.addresses, action.payload]
            };
        case REMOVE_ADDRESS:
            const index = state.addresses.findIndex((b: Address) => b._id === action.payload);
            return {
                ...state,
                addresses: [
                    ...state.addresses.slice(0, index),
                    ...state.addresses.slice(index + 1)
                ]
            };
        case ADDRESS_CHANGE:
            return {
                ...state,
                addressFormData: {
                    ...state.addressFormData,
                    ...action.payload
                }
            };
        case ADDRESS_EDIT_CHANGE:
            return {
                ...state,
                address: {
                    ...state.address,
                    ...action.payload
                }
            };
        case SET_ADDRESS_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.payload
            };
        case SET_ADDRESS_FORM_EDIT_ERRORS:
            return {
                ...state,
                editFormErrors: action.payload
            };
        case RESET_ADDRESS:
            return {
                ...state,
                addressFormData: {
                    address: '',
                    city: '',
                    state: '',
                    country: '',
                    zipCode: '',
                    isDefault: false
                },
                formErrors: {}
            };

        case SET_ADDRESS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };

        case SET_DEFAULT_ADDRESS:
            return {
                ...state,
                defaultAddress: action.payload
            };

        default:
            return state;
    }
};

export default addressReducer;