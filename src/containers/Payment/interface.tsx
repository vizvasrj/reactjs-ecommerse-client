import { CREATE_PAYMENT_ORDER, SET_PAYMENT_LOADING, GET_PAYMENT_STATUS } from './constants';

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

export type PaymentActionTypes = CreatePaymentOrderAction | GetPaymentStatusAction | SetPaymentLoadingAction;

// export type PaymentActionTypes = CreatePaymentOrderAction | PaymentCallbackAction | SetPaymentLoadingAction;