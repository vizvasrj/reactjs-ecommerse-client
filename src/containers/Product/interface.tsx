
import { ValidationErrors } from 'validatorjs';
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
    SET_PRODUCT_SHOP_FORM_ERRORS,
    RESET_PRODUCT_SHOP
} from './constants';
import { Brand } from '../Brand/interface';


export interface Product {
    _id: string;
    imageUrl?: string;
    name?: string;
    description?: string;
    quantity?: number;
    price?: number;
    isActive?: boolean;
    taxable?: { value: number; label: string };
    brand?: Brand;
    sku?: string;
    image?: any;
    category?: { value: number; label: string };
    createdAt?: string;
    updatedAt?: string;
    slug?: string;
    isLiked?: boolean;
    totalReviews: number;
    averageRating: string;
    store?: string;
    storeId?: string;
    inventory?: number;
    status?: string;
}


export interface FetchProductsAction {
    type: typeof FETCH_PRODUCTS;
    payload: Product[];
}

export interface FetchStoreProductsAction {
    type: typeof FETCH_STORE_PRODUCTS;
    payload: Product[];
}

export interface FetchProductAction {
    type: typeof FETCH_PRODUCT;
    payload: Product;
}

export interface FetchStoreProductAction {
    type: typeof FETCH_STORE_PRODUCT;
    payload: Product;
}

export interface ProductChangeAction {
    type: typeof PRODUCT_CHANGE;
    payload: { name: string; value: any };
}

export interface ProductEditChangeAction {
    type: typeof PRODUCT_EDIT_CHANGE;
    payload: { [key: string]: any };
}

export interface ProductShopChangeAction {
    type: typeof PRODUCT_SHOP_CHANGE;
    payload: { [key: string]: any };
}

export interface SetProductFormErrorsAction {
    type: typeof SET_PRODUCT_FORM_ERRORS;
    payload: { [key: string]: string };
}

export interface SetProductFormEditErrorsAction {
    type: typeof SET_PRODUCT_FORM_EDIT_ERRORS;
    payload: ValidationErrors;
}

export interface ResetProductAction {
    type: typeof RESET_PRODUCT;
}

export interface AddProductAction {
    type: typeof ADD_PRODUCT;
    payload: Product;
}

export interface RemoveProductAction {
    type: typeof REMOVE_PRODUCT;
    payload: string;
}

export interface FetchProductsSelectAction {
    type: typeof FETCH_PRODUCTS_SELECT;
    payload: { label: string; value: number }[];
}

export interface SetProductsLoadingAction {
    type: typeof SET_PRODUCTS_LOADING;
    payload: boolean;
}

export interface SetAdvancedFiltersAction {
    type: typeof SET_ADVANCED_FILTERS;
    payload: any; // You might need to define a more specific type for your filters
}

export interface ResetAdvancedFiltersAction {
    type: typeof RESET_ADVANCED_FILTERS;
}

export interface SetProductShopFormErrorsAction {
    type: typeof SET_PRODUCT_SHOP_FORM_ERRORS;
    // payload: { [key: string]: string };
    payload: ValidationErrors

}

export interface ResetProductShopAction {
    type: typeof RESET_PRODUCT_SHOP;
}


// Combine all Product action types
export type ProductActionTypes =
    | FetchProductsAction
    | FetchStoreProductsAction
    | FetchProductAction
    | FetchStoreProductAction
    | ProductChangeAction
    | ProductEditChangeAction
    | ProductShopChangeAction
    | SetProductFormErrorsAction
    | SetProductFormEditErrorsAction
    | ResetProductAction
    | AddProductAction
    | RemoveProductAction
    | FetchProductsSelectAction
    | SetProductsLoadingAction
    | SetAdvancedFiltersAction
    | ResetAdvancedFiltersAction
    | SetProductShopFormErrorsAction
    | ResetProductShopAction;
