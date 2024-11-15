
import { ValidationErrors } from 'validatorjs';
import {
    FETCH_MERCHANTS,
    REMOVE_MERCHANT,
    SET_ADVANCED_FILTERS,
    FETCH_SEARCHED_MERCHANTS,
    MERCHANT_CHANGE,
    SET_MERCHANT_FORM_ERRORS,
    SET_MERCHANTS_LOADING,
    SET_MERCHANTS_SUBMITTING,
    RESET_MERCHANT,
    SIGNUP_CHANGE,
    SET_SIGNUP_FORM_ERRORS,
    SIGNUP_RESET
} from './constants';
import { MERCHANT_STATUS } from '../../constants';

import { Action } from 'redux';

export interface Merchant {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    brandName: string;
    business: string;
    isActive: boolean;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
    status: MERCHANT_STATUS;
}

export interface MerchantFormData {
    name: string;
    email: string;
    phoneNumber: string;
    brandName: string;
    business: string;
}

export interface SignupFormData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface MerchantState {
    merchants: Merchant[];
    searchedMerchants: Merchant[];
    merchantFormData: MerchantFormData;
    signupFormData: SignupFormData;
    merchantFormErrors: { [key: string]: string };
    signupFormErrors: { [key: string]: string };
    advancedFilters: {
        totalPages: number;
        currentPage: number;
        count: number;
    };
    isLoading: boolean;
    isSubmitting: boolean;
}

export interface FetchMerchantsAction extends Action {
    type: typeof FETCH_MERCHANTS;
    payload: Merchant[];
}

export interface RemoveMerchantAction extends Action {
    type: typeof REMOVE_MERCHANT;
    payload: string;
}

export interface SetMerchantAdvancedFiltersAction extends Action {
    type: typeof SET_ADVANCED_FILTERS;
    payload: {
        totalPages: number;
        currentPage: number;
        count: number;
    };
}

export interface FetchSearchedMerchantsAction extends Action {
    type: typeof FETCH_SEARCHED_MERCHANTS;
    payload: Merchant[];
}

export interface MerchantChangeAction extends Action {
    type: typeof MERCHANT_CHANGE;
    payload: { [key: string]: any };
}

export interface SetMerchantFormErrorsAction extends Action {
    type: typeof SET_MERCHANT_FORM_ERRORS;
    // payload: { [key: string]: string };
    // todo: need to check that validation errors are correct form in here
    payload: ValidationErrors;

}

export interface SetMerchantsLoadingAction extends Action {
    type: typeof SET_MERCHANTS_LOADING;
    payload: boolean;
}

export interface SetMerchantsSubmittingAction extends Action {
    type: typeof SET_MERCHANTS_SUBMITTING;
    payload: boolean;
}

export interface ResetMerchantAction extends Action {
    type: typeof RESET_MERCHANT;
}

export interface SignupChangeAction extends Action {
    type: typeof SIGNUP_CHANGE;
    payload: { [key: string]: any };
}

export interface SetSignupFormErrorsAction extends Action {
    type: typeof SET_SIGNUP_FORM_ERRORS;
    // payload: { [key: string]: string };
    // todo: need to check that validation errors are correct form in here
    payload: ValidationErrors;
}

export interface SignupResetAction extends Action {
    type: typeof SIGNUP_RESET;
}

export type MerchantActionTypes =
    | FetchMerchantsAction
    | RemoveMerchantAction
    | SetMerchantAdvancedFiltersAction
    | FetchSearchedMerchantsAction
    | MerchantChangeAction
    | SetMerchantFormErrorsAction
    | SetMerchantsLoadingAction
    | SetMerchantsSubmittingAction
    | ResetMerchantAction
    | SignupChangeAction
    | SetSignupFormErrorsAction
    | SignupResetAction;