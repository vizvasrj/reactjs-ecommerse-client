import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';

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

import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import { signOut } from '../Login/actions';
import { API_URL } from '../../constants';

import {
    MerchantActionTypes,
    Merchant,
    FetchMerchantsAction,
    RemoveMerchantAction,
    SetMerchantAdvancedFiltersAction,
    FetchSearchedMerchantsAction,
    MerchantChangeAction,
    SetMerchantFormErrorsAction,
    SetMerchantsLoadingAction,
    SetMerchantsSubmittingAction,
    ResetMerchantAction,
    SignupChangeAction,
    SetSignupFormErrorsAction,
    SignupResetAction,
} from './interface';
import { RootState } from '../../reducer';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router';
import { navigate, NavigateActionType } from '../Navigate';
import { ClearAuthAction } from '../Authentication/action';
export const merchantChange = (name: string, value: any): MerchantChangeAction => {
    let formData: any = {};
    formData[name] = value;

    return {
        type: MERCHANT_CHANGE,
        payload: formData
    };
};

export const merchantSignupChange = (name: string, value: any): SignupChangeAction => {
    let formData: any = {};
    formData[name] = value;

    return {
        type: SIGNUP_CHANGE,
        payload: formData
    };
};

export const setMerchantLoading = (value: boolean): SetMerchantsLoadingAction => {
    return {
        type: SET_MERCHANTS_LOADING,
        payload: value
    };
};

export const setMerchantSubmitting = (value: boolean): SetMerchantsSubmittingAction => {
    return {
        type: SET_MERCHANTS_SUBMITTING,
        payload: value
    };
};

// add merchant api
export const addMerchant = (isBack = false) => {
    return async (dispatch: ThunkDispatch<RootState, null, MerchantActionTypes | NavigateActionType>, getState: () => RootState) => {
        try {
            // const navigate = useNavigate();
            const goback = () => dispatch(navigate(-1));

            const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

            const rules = {
                name: 'required',
                email: 'required|email',
                phoneNumber: ['required', `regex:${phoneno}`],
                brandName: 'required',
                business: 'required|min:10'
            };

            const merchant = getState().merchant.merchantFormData;

            const { isValid, errors } = allFieldsValidation(merchant, rules, {
                'required.name': 'Name is required.',
                'required.email': 'Email is required.',
                'email.email': 'Email format is invalid.',
                'required.phoneNumber': 'Phone number is required.',
                'regex.phoneNumber': 'Phone number format is invalid.',
                'required.brandName': 'Brand is required.',
                'required.business': 'Business is required.',
                'min.business': 'Business must be at least 10 characters.'
            });

            if (!isValid && errors) {
                // todo: if validation error as in interface.tsx used for
                // todo: SET_MERCHANT_FORM_ERRORS, then use this
                // todo: otherwise, use the below code to convert errors to {}
                // convert errors to {}
                // const transformedErrors: { [key: string]: string } = {};

                // for (const key in errors) {
                //     transformedErrors[key] = errors[key].join(' ');
                // }


                return dispatch({ type: SET_MERCHANT_FORM_ERRORS, payload: errors });
            }

            dispatch(setMerchantLoading(true));
            dispatch(setMerchantSubmitting(true));

            const response = await axios.post(`${API_URL}/merchant/add`, merchant);

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                // dispatch(success(successfulOptions));
                toast.success(successfulOptions.title, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                dispatch<ResetMerchantAction>({ type: RESET_MERCHANT });
                if (isBack) {
                    goback();
                }
            }
        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch(setMerchantSubmitting(false));
            dispatch(setMerchantLoading(false));
        }
    };
};

export const fetchMerchants = (n?: string, v?: any) => {
    return async (dispatch: ThunkDispatch<RootState, null, MerchantActionTypes>, getState: () => RootState) => {
        try {
            dispatch(setMerchantLoading(true));

            const response = await axios.get(`${API_URL}/merchant`, {
                params: {
                    page: v ?? 1,
                    limit: 20
                }
            });

            const { merchants, totalPages, currentPage, count } = response.data;

            dispatch<FetchMerchantsAction>({
                type: FETCH_MERCHANTS,
                payload: merchants
            });

            dispatch<SetMerchantAdvancedFiltersAction>({
                type: SET_ADVANCED_FILTERS,
                payload: { totalPages, currentPage, count }
            });
        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch(setMerchantLoading(false));
        }
    };
};

export const searchMerchants = (filter: { name: string, value: string }) => {
    return async (dispatch: ThunkDispatch<RootState, null, MerchantActionTypes>, getState: () => RootState) => {
        try {
            dispatch(setMerchantLoading(true));

            const response = await axios.get(`${API_URL}/merchant/search`, {
                params: {
                    search: filter.value
                }
            });

            dispatch<FetchSearchedMerchantsAction>({
                type: FETCH_SEARCHED_MERCHANTS,
                payload: response.data.merchants
            });
        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch(setMerchantLoading(false));
        }
    };
};

export const disableMerchant = (merchant: Merchant, value: boolean, search?: string | null, page?: number) => {
    return async (dispatch: ThunkDispatch<RootState, null, MerchantActionTypes>, getState: () => RootState) => {
        try {
            await axios.put(`${API_URL}/merchant/${merchant._id}/active`, {
                merchant: {
                    isActive: value
                }
            });

            if (search) {
                return dispatch(searchMerchants({ name: 'merchant', value: search })); // update search list if this is a search result
            }
            dispatch(fetchMerchants('merchant', page));
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

export const approveMerchant = (merchant: Merchant, search?: string | null, page?: number) => {
    return async (dispatch: ThunkDispatch<RootState, null, MerchantActionTypes>, getState: () => RootState) => {
        try {
            await axios.put(`${API_URL}/merchant/approve/${merchant._id}`);

            if (search) {
                return dispatch(searchMerchants({ name: 'merchant', value: search })); // update search list if this is a search result
            }
            dispatch(fetchMerchants('merchant', page));
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

export const rejectMerchant = (merchant: Merchant, search?: string | null, page?: number) => {
    return async (dispatch: ThunkDispatch<RootState, null, MerchantActionTypes>, getState: () => RootState) => {
        try {
            await axios.put(`${API_URL}/merchant/reject/${merchant._id}`);

            if (search) {
                return dispatch(searchMerchants({ name: 'merchant', value: search })); // update search list if this is a search result
            }
            dispatch(fetchMerchants('merchant', page));
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

export const merchantSignUp = (token: string) => {
    return async (dispatch: ThunkDispatch<RootState, null, MerchantActionTypes | ClearAuthAction | NavigateActionType>, getState: () => RootState) => {
        try {
            // const navigate = useNavigate();
            const rules = {
                email: 'required|email',
                password: 'required|min:6',
                firstName: 'required',
                lastName: 'required'
            };

            const merchant = getState().merchant.signupFormData;

            const { isValid, errors } = allFieldsValidation(merchant, rules, {
                'required.email': 'Email is required.',
                'required.password': 'Password is required.',
                'required.firstName': 'First Name is required.',
                'required.lastName': 'Last Name is required.'
            });

            if (!isValid && errors) {
                return dispatch<SetSignupFormErrorsAction>({ type: SET_SIGNUP_FORM_ERRORS, payload: errors });
            }

            await axios.post(`${API_URL}/merchant/signup/${token}`, merchant);

            const successfulOptions = {
                title: `You have signed up successfully! Please sign in with the email and password. Thank you!`,
                position: 'tr',
                autoDismiss: 1
            };

            dispatch(signOut());
            dispatch(navigate('/login'));

            // todo: lets see that i need toast after signout
            toast.success(successfulOptions.title, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });

            // dispatch(success(successfulOptions));
            // dispatch(push('/login'));
            dispatch<SignupResetAction>({ type: SIGNUP_RESET });
        } catch (error) {
            const title = `Please try to signup again!`;
            handleError(error, dispatch, title);
        }
    };
};

// delete merchant api
export const deleteMerchant = (merchant: Merchant, search?: string | null, page?: number) => {
    return async (dispatch: ThunkDispatch<RootState, null, MerchantActionTypes>, getState: () => RootState) => {
        try {
            const response = await axios.delete(
                `${API_URL}/merchant/delete/${merchant._id}`
            );

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                // dispatch(success(successfulOptions));
                toast.success(successfulOptions.title, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });


                if (search) {
                    return dispatch(searchMerchants({ name: 'merchant', value: search })); // update search list if this is a search result
                }

                dispatch(fetchMerchants('merchant', page));
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};