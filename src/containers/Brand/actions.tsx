import { toast } from 'react-toastify';
import axios from 'axios';
import { Brand } from './interface';
import {
    FETCH_BRANDS,
    FETCH_STORE_BRANDS,
    FETCH_BRAND,
    BRAND_CHANGE,
    BRAND_EDIT_CHANGE,
    SET_BRAND_FORM_ERRORS,
    SET_BRAND_FORM_EDIT_ERRORS,
    ADD_BRAND,
    REMOVE_BRAND,
    FETCH_BRANDS_SELECT,
    SET_BRANDS_LOADING,
    RESET_BRAND
} from './constants';

import handleError from '../../utils/error';
import { formatSelectOptions } from '../../utils/select';
import { allFieldsValidation } from '../../utils/validation';
import { API_URL } from '../../constants';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../reducer';
import { navigate, NavigateActionType } from '../Navigate';





// Action types for Brand related actions
export interface FetchBrandsAction {
    type: typeof FETCH_BRANDS;
    payload: Brand[];
}

export interface FetchStoreBrandsAction {
    type: typeof FETCH_STORE_BRANDS;
    payload: Brand[];
}

export interface FetchBrandAction {
    type: typeof FETCH_BRAND;
    payload: Brand;
}

export interface BrandChangeAction {
    type: typeof BRAND_CHANGE;
    payload: { [key: string]: any };
}

export interface BrandEditChangeAction {
    type: typeof BRAND_EDIT_CHANGE;
    payload: { [key: string]: any };
}

export interface SetBrandFormErrorsAction {
    type: typeof SET_BRAND_FORM_ERRORS;
    payload: { [key: string]: string | string[] | { [key: string]: string } }; // Allow nested objects or arrays

}

export interface SetBrandFormEditErrorsAction {
    type: typeof SET_BRAND_FORM_EDIT_ERRORS;
    payload: { [key: string]: string | string[] | { [key: string]: string } }; // Allow nested objects or arrays
}

export interface AddBrandAction {
    type: typeof ADD_BRAND;
    payload: Brand;
}

export interface RemoveBrandAction {
    type: typeof REMOVE_BRAND;
    payload: string;
}

export interface FetchBrandsSelectAction {
    type: typeof FETCH_BRANDS_SELECT;
    payload: { label: string; value: number }[];
}

export interface SetBrandsLoadingAction {
    type: typeof SET_BRANDS_LOADING;
    payload: boolean;
}

export interface ResetBrandAction {
    type: typeof RESET_BRAND;
}

// Combine all Brand action types
export type BrandActionTypes =
    | FetchBrandsAction
    | FetchStoreBrandsAction
    | FetchBrandAction
    | BrandChangeAction
    | BrandEditChangeAction
    | SetBrandFormErrorsAction
    | SetBrandFormEditErrorsAction
    | AddBrandAction
    | RemoveBrandAction
    | FetchBrandsSelectAction
    | SetBrandsLoadingAction
    | ResetBrandAction;


export const brandChange = (name: string, value: any): BrandChangeAction => {
    let formData: any = {};
    formData[name] = value;

    return {
        type: BRAND_CHANGE,
        payload: formData
    };
};

export const brandEditChange = (name: string, value: any): BrandEditChangeAction => {
    let formData: any = {};
    formData[name] = value;

    return {
        type: BRAND_EDIT_CHANGE,
        payload: formData
    };
};

// fetch store brands api
export const fetchStoreBrands = () => {
    return async (dispatch: any, getState: any) => {
        try {
            const response = await axios.get(`${API_URL}/brand/list`);

            dispatch({
                type: FETCH_STORE_BRANDS,
                payload: response.data.brands
            });
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// fetch brands api
export const fetchBrands = () => {
    console.log("EXECUTING fetchBrands")
    return async (dispatch: ThunkDispatch<RootState, null, BrandActionTypes>, getState: () => RootState) => {
        try {
            dispatch({ type: SET_BRANDS_LOADING, payload: true });

            const response = await axios.get(`${API_URL}/brand`);
            console.log("response.data.brands", response.data.brands);

            dispatch({
                type: FETCH_BRANDS,
                payload: response.data.brands
            });
        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch({ type: SET_BRANDS_LOADING, payload: false });
        }
    };
};

// fetch brand api
export const fetchBrand = (brandId: string) => {
    return async (dispatch: ThunkDispatch<RootState, null, BrandActionTypes>, getState: () => RootState) => {
        try {
            const response = await axios.get(`${API_URL}/brand/${brandId}`);

            dispatch({
                type: FETCH_BRAND,
                payload: response.data.brand
            });
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// fetch brands select api
export const fetchBrandsSelect = () => {
    return async (dispatch: ThunkDispatch<RootState, null, FetchBrandsSelectAction>, getState: () => RootState) => {
        try {
            const response = await axios.get(`${API_URL}/brand/list/select`);
            console.log("response.data.brands", response.data.brands)

            let formattedBrands = formatSelectOptions(response.data.brands, true);
            dispatch({
                type: FETCH_BRANDS_SELECT,
                payload: formattedBrands
            });
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// add brand api
export const addBrand = () => {
    return async (dispatch: ThunkDispatch<RootState, null, SetBrandFormErrorsAction | AddBrandAction | ResetBrandAction | NavigateActionType>, getState: () => RootState) => {
        try {
            const rules = {
                name: 'required',
                description: 'required|max:200'
            };

            const brand = getState().brand.brandFormData;

            const { isValid, errors } = allFieldsValidation(brand, rules, {
                'required.name': 'Name is required.',
                'required.description': 'Description is required.',
                'max.description': 'Description may not be greater than 200 characters.'
            });
            if (!isValid) {
                return dispatch({
                    type: SET_BRAND_FORM_ERRORS,
                    payload: errors as { [key: string]: string | string[] | { [key: string]: string } },
                });
            }

            const response = await axios.post(`${API_URL}/brand/add`, brand);

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                // dispatch(success(successfulOptions));
                toast.success(successfulOptions.title, {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                dispatch({
                    type: ADD_BRAND,
                    payload: response.data.brand
                });

                dispatch(navigate(-1));

                dispatch({ type: RESET_BRAND });
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// update brand api
export const updateBrand = () => {
    return async (dispatch: ThunkDispatch<RootState, null, BrandActionTypes | NavigateActionType>, getState: () => RootState) => {
        try {
            const rules = {
                name: 'required',
                slug: 'required|alpha_dash',
                description: 'required|max:200'
            };

            const brand = getState().brand.brand;

            const newBrand = {
                name: brand.name,
                slug: brand.slug,
                description: brand.description
            };

            const { isValid, errors } = allFieldsValidation(newBrand, rules, {
                'required.name': 'Name is required.',
                'required.slug': 'Slug is required.',
                'alpha_dash.slug':
                    'Slug may have alpha-numeric characters, as well as dashes and underscores only.',
                'required.description': 'Description is required.',
                'max.description': 'Description may not be greater than 200 characters.'
            });

            if (!isValid) {
                return dispatch({ type: SET_BRAND_FORM_EDIT_ERRORS, payload: errors as { [key: string]: string | string[] | { [key: string]: string } } });
            }

            const response = await axios.put(`${API_URL}/brand/${brand._id}`, {
                brand: newBrand
            });

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                // dispatch(success(successfulOptions));
                toast.success(successfulOptions.title, {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                dispatch(navigate(-1));
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// activate brand api
export const activateBrand = (id: string, value: boolean) => {
    return async (dispatch: ThunkDispatch<RootState, null, BrandActionTypes>, getState: () => RootState) => {
        try {
            const response = await axios.put(`${API_URL}/brand/${id}/active`, {
                brand: {
                    isActive: value
                }
            });

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                // dispatch(success(successfulOptions));
                toast.success(successfulOptions.title, {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });


                const brand = getState().brand.brand;
                dispatch(fetchBrand(brand._id));
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// delete brand api
export const deleteBrand = (id: string) => {
    return async (dispatch: ThunkDispatch<RootState, null, BrandActionTypes | NavigateActionType>, getState: () => RootState) => {
        try {
            const response = await axios.delete(`${API_URL}/brand/delete/${id}`);

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                // dispatch(success(successfulOptions));
                toast.success(successfulOptions.title, {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch({
                    type: REMOVE_BRAND,
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