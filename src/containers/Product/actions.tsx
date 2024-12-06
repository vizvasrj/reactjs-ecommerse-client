import axios from "axios";

import {
    FETCH_PRODUCTS,
    FETCH_STORE_PRODUCTS,
    FETCH_PRODUCT,
    FETCH_STORE_PRODUCT,
    PRODUCT_CHANGE,
    PRODUCT_EDIT_CHANGE,
    PRODUCT_SHOP_CHANGE,
    SET_PRODUCT_FORM_ERRORS,
    SET_PRODUCT_FORM_EDIT_ERRORS,
    RESET_PRODUCT,
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    FETCH_PRODUCTS_SELECT,
    SET_PRODUCTS_LOADING,
    SET_ADVANCED_FILTERS,
    RESET_ADVANCED_FILTERS,
    PRODUCT_EDIT
} from './constants';

import { Notification } from 'react-notification-system';
import { toast, ToastPosition } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { API_URL, ROLES } from "../../constants";
import handleError from "../../utils/error";
import { formatSelectOptions, unformatSelectOptions } from "../../utils/select";
import { allFieldsValidation } from "../../utils/validation";

import {
    ProductActionTypes,
    Product,
    FetchProductsAction,
    FetchStoreProductsAction,
    FetchProductAction,
    FetchStoreProductAction,
    ProductChangeAction,
    ProductEditChangeAction,
    ProductShopChangeAction,
    SetProductFormErrorsAction,
    SetProductFormEditErrorsAction,
    ResetProductAction,
    AddProductAction,
    RemoveProductAction,
    FetchProductsSelectAction,
    SetProductsLoadingAction,
    SetAdvancedFiltersAction,
    ResetAdvancedFiltersAction,
} from "./interface";
import { RootState } from "../../reducer";
import { ThunkDispatch } from "redux-thunk";
import { NavigateActionType, navigate } from "../Navigate";

export const productChange = (name: string, value: any): ProductChangeAction => {
    return {
        type: PRODUCT_CHANGE,
        payload: { name, value }
    };
};

export const productEditChange = (name: string, value: any): ProductEditChangeAction => {
    let formData: any = {};
    formData[name] = value;

    return {
        type: PRODUCT_EDIT_CHANGE,
        payload: formData
    };
};

export const productShopChange = (name: string, value: any): ProductShopChangeAction => {
    let formData: any = {};
    formData[name] = value;

    return {
        type: PRODUCT_SHOP_CHANGE,
        payload: formData
    };
};

export const resetProduct = () => {
    return async (dispatch: ThunkDispatch<RootState, null, ProductActionTypes>, getState: () => RootState) => {
        dispatch({ type: RESET_PRODUCT });
    };
};

export const setProductLoading = (value: boolean): SetProductsLoadingAction => {
    return {
        type: SET_PRODUCTS_LOADING,
        payload: value
    };
};

export const filterProducts2 = (n: string, v: any) => {
    return async (dispatch: ThunkDispatch<RootState, null, ProductActionTypes>, getState: () => RootState) => {
        const advancedFilters = getState().product.advancedFilters;
        const payload = productsFilterOrganizer(n, v, advancedFilters);

        dispatch({ type: SET_ADVANCED_FILTERS, payload });
    };
};

// fetch/filter store products api
export const filterProducts = (n: string, v?: any) => {
    return async (dispatch: ThunkDispatch<RootState, null, ProductActionTypes>, getState: () => RootState) => {
        try {
            console.log("filterProducts", n, v);
            dispatch(setProductLoading(true));
            const advancedFilters = getState().product.advancedFilters;
            const payload = productsFilterOrganizer(n, v, advancedFilters);

            dispatch({ type: SET_ADVANCED_FILTERS, payload });
            console.log("payload.order", payload.order);
            const sortOrder = getSortOrder(payload.order);
            console.log("sortOrder", sortOrder);
            const response = await axios.get(`${API_URL}/product/list`, {
                params: {
                    ...payload,
                    sortOrder: JSON.stringify(sortOrder)
                }
            });
            const { products, totalPages, currentPage, count } = response.data;

            dispatch({
                type: FETCH_STORE_PRODUCTS,
                payload: products
            });

            const newPayload = {
                ...payload,
                totalPages,
                currentPage,
                count
            };
            dispatch({
                type: SET_ADVANCED_FILTERS,
                payload: newPayload
            });
        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch(setProductLoading(false));
        }
    };
};

// fetch store product api
export const fetchStoreProduct = (slug: string) => {
    return async (dispatch: ThunkDispatch<RootState, null, ProductActionTypes>, getState: () => RootState) => {
        dispatch(setProductLoading(true));

        try {
            const response = await axios.get(`${API_URL}/product/item/${slug}`);

            const inventory = response.data.product.quantity;
            const product = { ...response.data.product, inventory };

            dispatch({
                type: FETCH_STORE_PRODUCT,
                payload: product
            });
        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch(setProductLoading(false));
        }
    };
};

export const fetchProductsSelect = () => {
    return async (dispatch: ThunkDispatch<RootState, null, ProductActionTypes>, getState: () => RootState) => {
        try {
            const response = await axios.get(`${API_URL}/product/list/select`);

            const formattedProducts = formatSelectOptions(response.data.products);

            dispatch({
                type: FETCH_PRODUCTS_SELECT,
                payload: formattedProducts
            });
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// fetch products api
export const fetchProducts = () => {
    return async (dispatch: ThunkDispatch<RootState, null, ProductActionTypes>, getState: () => RootState) => {
        try {
            dispatch(setProductLoading(true));

            const response = await axios.get(`${API_URL}/product`);

            dispatch({
                type: FETCH_PRODUCTS,
                payload: response.data.products
            });
        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch(setProductLoading(false));
        }
    };
};

// fetch product api
export const fetchProduct = (id: string, ifEditPage?: boolean) => {
    return async (dispatch: ThunkDispatch<RootState, null, ProductActionTypes>, getState: () => RootState) => {
        try {
            const response = await axios.get(`${API_URL}/product/${id}`);

            const inventory = response.data.product.quantity;

            const brand = response.data.product.brand;
            const isBrand = brand ? true : false;
            const brandData = formatSelectOptions(
                isBrand ? [brand] : [],
                !isBrand,
                'fetchProduct'
            );

            response.data.product.brand = brandData[0];

            const product = { ...response.data.product, inventory };

            if (ifEditPage) {
                dispatch({
                    type: PRODUCT_EDIT,
                    payload: product
                });
            } else {
                dispatch({
                    type: FETCH_PRODUCT,
                    payload: product
                });

            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// add product api
export const addProduct = () => {
    return async (dispatch: ThunkDispatch<RootState, null, ProductActionTypes | NavigateActionType>, getState: () => RootState) => {
        try {
            const rules = {
                sku: 'required|alpha_dash',
                name: 'required',
                description: 'required|max:200',
                quantity: 'required|numeric',
                price: 'required|numeric',
                taxable: 'required',
                image: 'required',
                brand: 'required'
            };

            const product = getState().product.productFormData;
            const user = getState().account.user;
            const brands = getState().brand.brandsSelect;

            const brand = unformatSelectOptions([product.brand]);

            const newProduct: {
                sku: any;
                name: any;
                description: any;
                price: any;
                quantity: any;
                image: any;
                isActive: any;
                taxable: any;
                brand: any;
                [key: string]: any; // Add this line
            } = {
                sku: product.sku,
                name: product.name,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
                image: product.image,
                isActive: product.isActive,
                taxable: product.taxable.value,
                brand:
                    user.role !== ROLES.Merchant
                        ? brand && brand.length !== 0
                            ? brand
                            : null
                        : brands[1].value,
            };

            const { isValid, errors } = allFieldsValidation(newProduct, rules, {
                'required.sku': 'Sku is required.',
                'alpha_dash.sku':
                    'Sku may have alpha-numeric characters, as well as dashes and underscores only.',
                'required.name': 'Name is required.',
                'required.description': 'Description is required.',
                'max.description':
                    'Description may not be greater than 200 characters.',
                'required.quantity': 'Quantity is required.',
                'required.price': 'Price is required.',
                'required.taxable': 'Taxable is required.',
                'required.image': 'Please upload files with jpg, jpeg, png format.',
                'required.brand': 'Brand is required.'
            });

            if (!isValid && errors) {
                const transformedErrors = Object.entries(errors).reduce((acc, [key, value]) => {
                    acc[key] = String(value);
                    return acc;
                }, {} as { [key: string]: string });
                return dispatch({ type: SET_PRODUCT_FORM_ERRORS, payload: transformedErrors });
            }
            const formData = new FormData();
            if (newProduct.image) {
                for (const key in newProduct) {
                    if (newProduct.hasOwnProperty(key)) {
                        if (key === 'brand' && newProduct[key] === null) {
                            continue;
                        } else {
                            formData.set(key, newProduct[key]);
                        }
                    }
                }
            }

            const response = await axios.post(`${API_URL}/product/add`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {

                let successfulOptions = {
                    title: `${response.data.message}`,
                    position: 'tr',
                    autoDismiss: 1,
                    message: 'Product added successfully!'
                };
                toast.success(successfulOptions.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });

                dispatch({
                    type: ADD_PRODUCT,
                    payload: response.data.product
                });
                dispatch(resetProduct());
                // const navigate = useNavigate();
                dispatch(navigate(-1));
                // dispatch(goBack());
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// update Product api
export const updateProduct = () => {
    return async (dispatch: ThunkDispatch<RootState, null, ProductActionTypes>, getState: () => RootState) => {
        try {
            const rules = {
                name: 'required',
                sku: 'required|alpha_dash',
                slug: 'required|alpha_dash',
                description: 'required|max:200',
                quantity: 'required|numeric',
                price: 'required|numeric',
            };

            const product = getState().product.productFormData;

            const brand = unformatSelectOptions([product.brand]);

            const newProduct = {
                name: product.name,
                sku: product.sku,
                slug: product.slug,
                description: product.description,
                quantity: product.quantity,
                price: product.price,
                // taxable: product.taxable,
                // brand: brand && brand.length != 0 ? brand : null
            };

            const { isValid, errors } = allFieldsValidation(newProduct, rules, {
                'required.name': 'Name is required.',
                'required.sku': 'Sku is required.',
                'alpha_dash.sku':
                    'Sku may have alpha-numeric characters, as well as dashes and underscores only.',
                'required.slug': 'Slug is required.',
                'alpha_dash.slug':
                    'Slug may have alpha-numeric characters, as well as dashes and underscores only.',
                'required.description': 'Description is required.',
                'max.description':
                    'Description may not be greater than 200 characters.',
                'required.quantity': 'Quantity is required.',
                'required.price': 'Price is required.'
            });
            console.log("errors", errors);
            if (!isValid && errors) {
                dispatch({
                    type: SET_PRODUCT_FORM_EDIT_ERRORS,
                    payload: errors
                });
                return;

            }

            console.log("response");
            const response = await axios.put(`${API_URL}/product/${product._id}`, {
                product: newProduct
            });

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                // dispatch(success(successfulOptions));
                let successfulOptions = {
                    title: `${response.data.message}`,
                    position: 'tr',
                    autoDismiss: 1,
                    message: 'Product updated successfully!'
                };
                toast.success(successfulOptions.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });

                //dispatch(goBack());
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// activate product api
export const activateProduct = (id: string, value: boolean) => {
    return async (dispatch: ThunkDispatch<RootState, null, ProductActionTypes>, getState: () => RootState) => {
        try {
            const response = await axios.put(`${API_URL}/product/${id}/active`, {
                product: {
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
                let successfulOptions = {
                    title: `${response.data.message}`,
                    position: 'tr',
                    autoDismiss: 1,
                    message: 'Product updated successfully!'
                };
                toast.success(successfulOptions.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};


// delete product api
export const deleteProduct = (id: string) => {
    return async (dispatch: ThunkDispatch<RootState, null, ProductActionTypes | NavigateActionType>, getState: () => RootState) => {
        try {
            const response = await axios.delete(`${API_URL}/product/delete/${id}`);

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                // dispatch(success(successfulOptions));
                let successfulOptions = {
                    title: `${response.data.message}`,
                    position: 'tr',
                    autoDismiss: 1,
                    message: 'Product deleted successfully!'
                };
                toast.success(successfulOptions.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });

                dispatch({
                    type: REMOVE_PRODUCT,
                    payload: id
                });
                // dispatch(goBack());

                // const navigate = useNavigate();
                dispatch(navigate(-1));
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

const productsFilterOrganizer = (n: string, v: any, s: any) => {
    switch (n) {
        case 'category':
            return {
                name: s.name,
                category: v,
                brand: 'all',
                min: s.min,
                max: s.max,
                rating: s.rating,
                order: s.order,
                page: s.currentPage,
                limit: s.limit
            };
        case 'brand':
            return {
                name: s.name,
                category: 'all',
                brand: v,
                min: s.min,
                max: s.max,
                rating: s.rating,
                order: s.order,
                page: s.currentPage,
                limit: s.limit
            };
        case 'sorting':
            return {
                name: s.name,
                category: s.category,
                brand: s.brand,
                min: s.min,
                max: s.max,
                rating: s.rating,
                order: v,
                page: s.currentPage,
                limit: s.limit
            };
        case 'price':
            return {
                name: s.name,
                category: s.category,
                brand: s.brand,
                min: v[0],
                max: v[1],
                rating: s.rating,
                order: s.order,
                page: s.currentPage,
                limit: s.limit
            };
        case 'rating':
            return {
                name: s.name,
                category: s.category,
                brand: s.brand,
                min: s.min,
                max: s.max,
                rating: v,
                order: s.order,
                page: s.currentPage,
                limit: s.limit
            };
        case 'pagination':
            return {
                name: s.name,
                category: s.category,
                brand: s.brand,
                min: s.min,
                max: s.max,
                rating: s.rating,
                order: s.order,
                page: v ?? s.currentPage,
                limit: s.limit
            };
        default:
            return {
                name: s.name,
                category: 'all',
                brand: 'all',
                min: s.min,
                max: s.max,
                rating: s.rating,
                order: s.order,
                page: s.currentPage,
                limit: s.limit
            };
    }
};

const getSortOrder = (value: number) => {
    let sortOrder: any = {};
    switch (value) {
        case 0:
            sortOrder._id = -1;
            break;
        case 1:
            sortOrder.price = -1;
            break;
        case 2:
            sortOrder.price = 1;
            break;

        default:
            break;
    }

    return sortOrder;
};