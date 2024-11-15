import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';

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

import handleError from '../../utils/error';
import { allFieldsValidation, santizeFields } from '../../utils/validation';
import { API_URL } from '../../constants';
import { RootState } from '../../reducer';

import {
    Review,
    ReviewState,
    ReviewFormData,
    FetchReviewsAction,
    SetReviewsLoadingAction,
    AddReviewAction,
    RemoveReviewAction,
    FetchProductReviewsAction,
    ReviewChangeAction,
    ResetReviewAction,
    SetReviewFormErrorsAction,
    SetAdvancedFiltersAction,
    ReviewSummary,
    ReviewActionTypes,
} from './interface';
import { toast } from 'react-toastify';
import toastConfig from '../../utils/toastConfig';

export const reviewChange = (name: string, value: any): ReviewChangeAction => {

    console.log("reviewChange", name, value);
    let formData: any = {};
    formData[name] = value;
    return {
        type: REVIEW_CHANGE,
        payload: formData
    };
};

// fetch reviews api
export const fetchReviews = (n?: string, v?: number) => {
    return async (dispatch: ThunkDispatch<RootState, null, ReviewActionTypes>, getState: () => RootState) => {
        try {
            dispatch<SetReviewsLoadingAction>({ type: SET_REVIEWS_LOADING, payload: true });

            const response = await axios.get(`${API_URL}/review`, {
                params: {
                    page: v ?? 1,
                    limit: 20
                }
            });

            const { reviews, totalPages, currentPage, count } = response.data;

            dispatch<FetchReviewsAction>({ type: FETCH_REVIEWS, payload: reviews });

            dispatch<SetAdvancedFiltersAction>({
                type: SET_ADVANCED_FILTERS,
                payload: { totalPages, currentPage, count }
            });

        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch<SetReviewsLoadingAction>({ type: SET_REVIEWS_LOADING, payload: false });
        }
    };
};

export const approveReview = (review: Review) => {
    return async (dispatch: ThunkDispatch<RootState, null, ReviewActionTypes>) => {
        try {
            await axios.put(`${API_URL}/review/approve/${review._id}`);

            // dispatch(fetchReviews(1, 20));
            dispatch(fetchReviews());

        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

export const rejectReview = (review: Review) => {
    return async (dispatch: ThunkDispatch<RootState, null, ReviewActionTypes>) => {
        try {
            await axios.put(`${API_URL}/review/reject/${review._id}`);

            // dispatch(fetchReviews(1, 20));
            dispatch(fetchReviews());

        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// delete review api
export const deleteReview = (id: string) => {
    return async (dispatch: ThunkDispatch<RootState, null, ReviewActionTypes>) => {
        try {
            const response = await axios.delete(`${API_URL}/review/delete/${id}`);

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                // dispatch(success(successfulOptions));
                toast.success(successfulOptions.title, toastConfig)
                dispatch<RemoveReviewAction>({
                    type: REMOVE_REVIEW,
                    payload: id
                });
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// fetch product reviews api
export const fetchProductReviews = (slug: string) => {
    return async (dispatch: ThunkDispatch<RootState, null, ReviewActionTypes>) => {
        try {
            const response = await axios.get(`${API_URL}/review/${slug}`);

            const { ratingSummary, totalRatings, totalReviews, totalSummary } =
                getProductReviewsSummary(response.data.reviews);

            dispatch<FetchProductReviewsAction>({
                type: FETCH_PRODUCT_REVIEWS,
                payload: {
                    reviews: response.data.reviews,
                    reviewsSummary: {
                        ratingSummary,
                        totalRatings,
                        totalReviews,
                        totalSummary
                    }
                }
            });

        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

export const addProductReview = () => {
    return async (dispatch: ThunkDispatch<RootState, null, ReviewActionTypes>, getState: () => RootState) => {
        try {
            const rules = {
                title: 'required',
                review: 'required',
                rating: 'required|numeric|min:1',
                isRecommended: 'required'
            };

            const review = getState().review.reviewFormData;
            const product = getState().product.storeProduct;

            const newReview = {
                product: product._id,
                isRecommended: review.isRecommended.value,
                rating: review.rating,
                review: review.review,
                title: review.title
            };

            const { isValid, errors } = allFieldsValidation(newReview, rules, {
                'required.title': 'Title is required.',
                'required.review': 'Review is required.',
                'required.rating': 'Rating is required.',
                'min.rating': 'Rating is required.',
                'required.isRecommended': 'Recommendable is required.'
            });

            if (!isValid && errors) {
                return dispatch<SetReviewFormErrorsAction>({ type: SET_REVIEW_FORM_ERRORS, payload: errors });
            }

            const santizedReview = santizeFields(newReview);

            const response = await axios.post(`${API_URL}/review/add`, {
                ...santizedReview,
                isRecommended: review.isRecommended.value
            });

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                // dispatch(success(successfulOptions));
                toast.success(successfulOptions.title, toastConfig)
                if (product.slug) {
                    dispatch(fetchProductReviews(product.slug));
                }

                // dispatch({
                //   type: ADD_REVIEW,
                //   payload: response.data.review
                // });
                dispatch<ResetReviewAction>({ type: RESET_REVIEW });
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

export const getProductReviewsSummary = (reviews: Review[]): ReviewSummary => {
    let ratingSummary: { [key: number]: number }[] = [{ 5: 0 }, { 4: 0 }, { 3: 0 }, { 2: 0 }, { 1: 0 }];
    let totalRatings = 0;
    let totalReviews = 0;
    let totalSummary = 0;

    if (reviews.length > 0) {
        reviews.map((item) => {
            totalRatings += item.rating;
            totalReviews += 1;

            switch (Math.round(item.rating)) {
                case 5:
                    ratingSummary[0][5] += 1;
                    totalSummary += 1;
                    break;
                case 4:
                    ratingSummary[1][4] += 1;
                    totalSummary += 1;
                    break;
                case 3:
                    ratingSummary[2][3] += 1;
                    totalSummary += 1;
                    break;
                case 2:
                    ratingSummary[3][2] += 1;
                    totalSummary += 1;
                    break;
                case 1:
                    ratingSummary[4][1] += 1;
                    totalSummary += 1;
                    break;
                default:
                    0;
                    break;
            }
        });
    }

    return { ratingSummary, totalRatings, totalReviews, totalSummary };
};