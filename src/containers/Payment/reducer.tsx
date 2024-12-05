import {
    CREATE_PAYMENT_ORDER,
    SET_PAYMENT_LOADING,
    GET_PAYMENT_STATUS,
    SET_RAZORPAY_PAYMENT_ORDER_ID,
} from './constants';
import { PaymentActionTypes } from './interface';

interface PaymentState {
    loading: boolean;
    orderCallbackData: {
        success: boolean;
        order: {
            id: string;
            status: string;
            amount: number;
            paymentMethod: string;
            createdAt: string;
        };
    };
    paymentData: {
        success: boolean;
        message: string;
        paymentLink: string;
        paymentSessionId: string;
    },
    razorpay: {
        razorPayOrderId: string;
        key: string;
        orderId: string
        amount: number;
    };
}

const initialState: PaymentState = {
    loading: false,
    orderCallbackData: {
        success: false,
        order: {
            id: '',
            status: '',
            amount: 0,
            paymentMethod: '',
            createdAt: '',
        },
    },
    paymentData: {
        success: false,
        message: '',
        paymentLink: '',
        paymentSessionId: '',
    },
    razorpay: {
        razorPayOrderId: '',
        key: '',
        orderId: '',
        amount: 0,
    }
};

const paymentReducer = (state = initialState, action: PaymentActionTypes): PaymentState => {
    switch (action.type) {
        case CREATE_PAYMENT_ORDER:
            return {
                ...state,
                paymentData: {
                    success: action.payload.success,
                    message: action.payload.message,
                    paymentLink: action.payload.paymentLink,
                    paymentSessionId: action.payload.paymentSessionId,
                },
            };
        case SET_PAYMENT_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case GET_PAYMENT_STATUS:
            return {
                ...state,
                orderCallbackData: {
                    success: action.payload.success,
                    order: {
                        id: action.payload.order.id,
                        status: action.payload.order.status,
                        amount: action.payload.order.amount,
                        paymentMethod: action.payload.order.paymentMethod,
                        createdAt: action.payload.order.createdAt,
                    },
                },
            };

        case SET_RAZORPAY_PAYMENT_ORDER_ID:
            return {
                ...state,
                razorpay: {
                    razorPayOrderId: action.payload.razorPayOrderId,
                    key: action.payload.key,
                    orderId: action.payload.orderId,
                    amount: action.payload.amount,
                },
            };
        default:
            return state;
    }
};


export default paymentReducer;