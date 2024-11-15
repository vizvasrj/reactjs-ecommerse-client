import { ValidationErrors } from 'validatorjs';
import {
    FETCH_REVIEWS,
    SET_REVIEWS_LOADING,
    ADD_REVIEW,
    REMOVE_REVIEW,
    FETCH_PRODUCT_REVIEWS,
    REVIEW_CHANGE,
    RESET_REVIEW,
    SET_REVIEW_FORM_ERRORS,
    SET_ADVANCED_FILTERS
} from './constants';
import { REVIEW_STATUS } from '../../constants';

import { Action } from 'redux';
import { Product } from '../Product/interface';
export interface Review {
    _id: string;
    product: Product;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    rating: number;
    isRecommended: {
        value: number;
        label: string;
    }
    title: string;
    review: string;
    isApproved: boolean;
    created: string;
    updated: string;
    status: REVIEW_STATUS;

}

export interface ReviewFormData {
    title: string;
    review: string;
    rating: number;
    isRecommended: {
        value: number;
        label: string;
    };
}

export interface ReviewState {
    reviews: Review[];
    productReviews: Review[];
    reviewFormData: ReviewFormData;
    reviewFormErrors: { [key: string]: string };
    reviewsSummary: {
        ratingSummary: any;
        totalRatings: number;
        totalReviews: number;
        totalSummary: number;
    };
    advancedFilters: {
        totalPages: number;
        currentPage: number;
        count: number;
    };
    isLoading: boolean;
}

export interface FetchReviewsAction extends Action {
    type: typeof FETCH_REVIEWS;
    payload: Review[];
}

export interface SetReviewsLoadingAction extends Action {
    type: typeof SET_REVIEWS_LOADING;
    payload: boolean;
}

export interface AddReviewAction extends Action {
    type: typeof ADD_REVIEW;
    payload: Review;
}

export interface RemoveReviewAction extends Action {
    type: typeof REMOVE_REVIEW;
    payload: string;
}

export interface FetchProductReviewsAction extends Action {
    type: typeof FETCH_PRODUCT_REVIEWS;
    payload: {
        reviews: Review[];
        reviewsSummary: ReviewSummary;
    };
}

export interface ReviewChangeAction extends Action {
    type: typeof REVIEW_CHANGE;
    payload: { [key: string]: any };
}

export interface ResetReviewAction extends Action {
    type: typeof RESET_REVIEW;
}

export interface SetReviewFormErrorsAction extends Action {
    type: typeof SET_REVIEW_FORM_ERRORS;
    // payload: { [key: string]: string };
    payload: ValidationErrors;
}

export interface SetAdvancedFiltersAction extends Action {
    type: typeof SET_ADVANCED_FILTERS;
    payload: {
        totalPages: number;
        currentPage: number;
        count: number;
    };
}

export interface ReviewSummary {
    ratingSummary: any;
    totalRatings: number;
    totalReviews: number;
    totalSummary: number;
}

export type ReviewActionTypes =
    | FetchReviewsAction
    | SetReviewsLoadingAction
    | AddReviewAction
    | RemoveReviewAction
    | FetchProductReviewsAction
    | ReviewChangeAction
    | ResetReviewAction
    | SetReviewFormErrorsAction
    | SetAdvancedFiltersAction;