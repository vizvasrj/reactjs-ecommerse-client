import { API_URL } from '../../constants';
import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import { CREATE_PAYMENT_ORDER, SET_PAYMENT_LOADING, GET_PAYMENT_STATUS } from './constants';
import handleError from '../../utils/error';
import { RootState } from '../../reducer';

import {
    CreatePaymentOrderAction,
    GetPaymentStatusAction,
    SetPaymentLoadingAction,
    PaymentActionTypes
} from './interface';

export const createPaymentOrder = (orderData: { orderId: string; amount: number; currency: string; customerDetails: any }) => {
    return async (dispatch: ThunkDispatch<RootState, null, PaymentActionTypes>) => {
        try {
            dispatch(setPaymentLoading(true));
            console.log("orderData", orderData);
            const response = await axios.post(`${API_URL}/payment`, orderData);

            dispatch<CreatePaymentOrderAction>({
                type: CREATE_PAYMENT_ORDER,
                payload: response.data
            });

        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch(setPaymentLoading(false));
        }
    };
};

export const getPaymentStatus = (orderId: string) => {
    return async (dispatch: ThunkDispatch<RootState, null, PaymentActionTypes>) => {
        try {
            dispatch(setPaymentLoading(true));

            const response = await axios.get(`${API_URL}/payment/status/${orderId}`);

            dispatch<GetPaymentStatusAction>({
                type: GET_PAYMENT_STATUS,
                payload: response.data
            });

        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch(setPaymentLoading(false));
        }
    };
};

export const setPaymentLoading = (value: boolean): SetPaymentLoadingAction => {
    return {
        type: SET_PAYMENT_LOADING,
        payload: value
    };
};

