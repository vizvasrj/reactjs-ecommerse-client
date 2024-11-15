import {
    FETCH_CATEGORIES,
    FETCH_STORE_CATEGORIES,
    FETCH_CATEGORY,
    CATEGORY_CHANGE,
    CATEGORY_EDIT_CHANGE,
    SET_CATEGORY_FORM_ERRORS,
    SET_CATEGORY_FORM_EDIT_ERRORS,
    ADD_CATEGORY,
    REMOVE_CATEGORY,
    SET_CATEGORIES_LOADING,
    RESET_CATEGORY
} from './constants';


import { Action } from 'redux';
import { Product } from '../Product/interface';
import { ValidationErrors } from 'validatorjs';

export interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    // todo temp disabled
    // products:
    // | Product[]
    // | {
    //     value: string;
    //     label: string;
    // }[];
    products: Product[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryFormData {
    name: string;
    description: string;
    isActive: boolean;
    products: Product[]
    // todo temp disabled
    // products:
    // | {
    //     value: string;
    //     label: string;
    // }[]
    | null;
}

export interface CategoryState {
    categories: Category[];
    storeCategories: Category[];
    category: Category | null;
    categoryFormData: CategoryFormData;
    categoryFormErrors: { [key: string]: string };
    categoryFormEditErrors: { [key: string]: string };
    isLoading: boolean;
}

export interface FetchCategoriesAction extends Action {
    type: typeof FETCH_CATEGORIES;
    payload: Category[];
}

export interface FetchStoreCategoriesAction extends Action {
    type: typeof FETCH_STORE_CATEGORIES;
    payload: Category[];
}

export interface FetchCategoryAction extends Action {
    type: typeof FETCH_CATEGORY;
    payload: Category;
}

export interface CategoryChangeAction extends Action {
    type: typeof CATEGORY_CHANGE;
    payload: { [key: string]: any };
}

export interface CategoryEditChangeAction extends Action {
    type: typeof CATEGORY_EDIT_CHANGE;
    payload: { [key: string]: any };
}

export interface SetCategoryFormErrorsAction extends Action {
    type: typeof SET_CATEGORY_FORM_ERRORS;
    // payload: { [key: string]: string };
    payload: ValidationErrors
}

export interface SetCategoryFormEditErrorsAction extends Action {
    type: typeof SET_CATEGORY_FORM_EDIT_ERRORS;
    // payload: { [key: string]: string };
    payload: ValidationErrors
}

export interface AddCategoryAction extends Action {
    type: typeof ADD_CATEGORY;
    payload: Category;
}

export interface RemoveCategoryAction extends Action {
    type: typeof REMOVE_CATEGORY;
    payload: string;
}

export interface SetCategoriesLoadingAction extends Action {
    type: typeof SET_CATEGORIES_LOADING;
    payload: boolean;
}

export interface ResetCategoryAction extends Action {
    type: typeof RESET_CATEGORY;
}

export type CategoryActionTypes =
    | FetchCategoriesAction
    | FetchStoreCategoriesAction
    | FetchCategoryAction
    | CategoryChangeAction
    | CategoryEditChangeAction
    | SetCategoryFormErrorsAction
    | SetCategoryFormEditErrorsAction
    | AddCategoryAction
    | RemoveCategoryAction
    | SetCategoriesLoadingAction
    | ResetCategoryAction;