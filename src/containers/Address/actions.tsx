// import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';
import { navigate, NavigateActionType } from "../Navigate";
import { ThunkDispatch } from 'redux-thunk';

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

import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import { API_URL } from '../../constants';
import { RootState } from '../../reducer';

import {
    Address,
    AddressState,
    FetchAddressAction,
    FetchAddressesAction,
    AddressChangeAction,
    AddressEditChangeAction,
    SetAddressFormErrorsAction,
    SetAddressFormEditErrorsAction,
    ResetAddressAction,
    AddAddressAction,
    RemoveAddressAction,
    SetAddressLoadingAction,
    AddressSelectAction,
    AddressActionTypes,
    SetDefaultAddressAction,
} from './interface';
import { toast } from 'react-toastify';
import toastConfig from '../../utils/toastConfig';
// import { navigate, NavigateActionType } from "../Navigate";
export const addressChange = (name: string, value: any): AddressChangeAction => {
    let formData: any = {};
    formData[name] = value;

    return {
        type: ADDRESS_CHANGE,
        payload: formData
    };
};

export const addressEditChange = (name: string, value: any): AddressEditChangeAction => {
    let formData: any = {};
    formData[name] = value;

    return {
        type: ADDRESS_EDIT_CHANGE,
        payload: formData
    };
};

export const handleAddressSelect = (value: string): AddressSelectAction => {
    return {
        type: ADDRESS_SELECT,
        payload: value
    };
};

export const setAddressLoading = (value: boolean): SetAddressLoadingAction => {
    return {
        type: SET_ADDRESS_LOADING,
        payload: value
    };
};

export const fetchAddresses = () => {
    return async (dispatch: ThunkDispatch<RootState, null, AddressActionTypes>) => {
        try {
            console.log("fetchAddresses from actions")
            dispatch(setAddressLoading(true));
            const response = await axios.get(`${API_URL}/address`);
            console.log("fetchAddresses response", response.data.addresses)
            dispatch<FetchAddressesAction>({ type: FETCH_ADDRESSES, payload: response.data.addresses });
        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch(setAddressLoading(false));
        }
    };
};

export const setDefaultAddress = (id: string) => {
    return async (dispatch: ThunkDispatch<RootState, null, AddressActionTypes>) => {
        try {
            dispatch(setAddressLoading(true));
            const response = await axios.put(`${API_URL}/address/default/${id}`);
            dispatch<SetDefaultAddressAction>({
                type: SET_DEFAULT_ADDRESS,
                payload: response.data.address
            });
            dispatch(fetchAddresses());
        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch(setAddressLoading(false));
        }
    }

}

export const someFunctionToTest = () => {
    return async (dispatch: ThunkDispatch<RootState, null, AddressActionTypes>) => {
        try {
            console.log("someFunctionToTest")
        } catch (error) {
            console.log("error", error)
            handleError(error, dispatch);
        }
    };

}

// fetch address api
export const fetchAddress = (addressId: string) => {
    return async (dispatch: ThunkDispatch<RootState, null, AddressActionTypes>) => {
        try {
            console.log("before axios")
            const response = await axios.get(`${API_URL}/address/${addressId}`);
            console.log("after axios", response.data.address)
            dispatch<FetchAddressAction>({
                type: FETCH_ADDRESS,
                payload: response.data.address
            });
        } catch (error) {
            console.log("error", error)
            handleError(error, dispatch);
        }
    };
};

export const addAddress = () => {
    return async (dispatch: ThunkDispatch<RootState, null, AddressActionTypes | NavigateActionType>, getState: () => RootState) => {
        try {
            const rules = {
                address: 'required',
                city: 'required',
                state: 'required',
                country: 'required',
                zipCode: 'required|min:5'
            };

            const newAddress = getState().address.addressFormData;
            const isDefault = getState().address.isDefault;

            const { isValid, errors } = allFieldsValidation(newAddress, rules, {
                'required.address': 'Address is required.',
                'required.city': 'City is required.',
                'required.state': 'State is required.',
                'required.country': 'Country is required.',
                'required.zipCode': 'Zipcode is required.'
            });

            if (!isValid && errors) {
                return dispatch<SetAddressFormErrorsAction>({ type: SET_ADDRESS_FORM_ERRORS, payload: errors });
            }

            const address = {
                isDefault,
                ...newAddress
            };

            const response = await axios.post(`${API_URL}/address/add`, address);

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                // dispatch(success(successfulOptions));
                toast.success(successfulOptions.title, toastConfig);
                dispatch<AddAddressAction>({
                    type: ADD_ADDRESS,
                    payload: response.data.address
                });
                dispatch<NavigateActionType>(navigate(-1))
                // dispatch(goBack());

                dispatch<ResetAddressAction>({ type: RESET_ADDRESS });
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// update address api
export const updateAddress = () => {
    return async (dispatch: ThunkDispatch<RootState, null, AddressActionTypes | NavigateActionType>, getState: () => RootState) => {
        try {
            const rules = {
                country: 'required',
                city: 'required',
                state: 'required',
                address: 'required',
                zipCode: 'required'
            };

            const newAddress = getState().address.address;

            const { isValid, errors } = allFieldsValidation(newAddress, rules, {
                'required.address': 'Address is required.',
                'required.city': 'City is required.',
                'required.state': 'State is required.',
                'required.country': 'Country is required.',
                'required.zipCode': 'Zipcode is required.'
            });

            if (!isValid && errors) {
                return dispatch<SetAddressFormEditErrorsAction>({
                    type: SET_ADDRESS_FORM_EDIT_ERRORS,
                    payload: errors
                });
            }

            const response = await axios.put(
                `${API_URL}/address/${newAddress._id}`,
                newAddress
            );

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                // dispatch(success(successfulOptions));
                toast.success(successfulOptions.title, toastConfig);

                dispatch(navigate(-1));
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// delete address api
export const deleteAddress = (id: string) => {
    return async (dispatch: ThunkDispatch<RootState, null, AddressActionTypes | NavigateActionType>) => {
        try {
            const response = await axios.delete(`${API_URL}/address/delete/${id}`);

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                // dispatch(success(successfulOptions));
                toast.success(successfulOptions.title, toastConfig);
                dispatch<RemoveAddressAction>({
                    type: REMOVE_ADDRESS,
                    payload: id
                });
                // dispatch(goBack());
                dispatch(navigate(-1));
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

