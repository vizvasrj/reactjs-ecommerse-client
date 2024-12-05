import { CREATE_PAYMENT_ORDER, SET_PAYMENT_LOADING, GET_PAYMENT_STATUS, SET_RAZORPAY_PAYMENT_ORDER_ID } from './constants';

export interface CreatePaymentOrderAction {
    type: typeof CREATE_PAYMENT_ORDER;
    payload: {
        success: boolean;
        message: string;
        paymentLink: string;
        paymentSessionId: string;
    };
}

// export interface PaymentCallbackAction {
//     type: typeof PAYMENT_CALLBACK;
//     payload: {
//         success: boolean;
//         message: string;
//     };
// }

export interface SetPaymentLoadingAction {
    type: typeof SET_PAYMENT_LOADING;
    payload: boolean;
}

export interface GetPaymentStatusAction {
    type: typeof GET_PAYMENT_STATUS;
    payload: {
        success: boolean;
        order: {
            id: string;
            status: string;
            amount: number;
            paymentMethod: string;
            createdAt: string;
        };
    };
}

export interface SetPaymentOrderId {
    type: typeof SET_RAZORPAY_PAYMENT_ORDER_ID;
    payload: {
        razorPayOrderId: string;
        key: string;
        orderId: string;
        amount: number;
    };
}

export type PaymentActionTypes = CreatePaymentOrderAction | GetPaymentStatusAction | SetPaymentLoadingAction | SetPaymentOrderId;

// export type PaymentActionTypes = CreatePaymentOrderAction | PaymentCallbackAction | SetPaymentLoadingAction;