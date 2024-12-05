import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import {
    FETCH_ORDERS,
    FETCH_SEARCHED_ORDERS,
    FETCH_ORDER,
    UPDATE_ORDER_STATUS,
    SET_ORDERS_LOADING,
    SET_ADVANCED_FILTERS,
    CLEAR_ORDERS,
    SET_SELECTED_ADDRESS,
    SET_CART_ID_FOR_ORDER_TO_PLACE
} from './constants';

import { clearCart, getCartId } from '../Cart/actions';
import { toggleCart } from '../Navigation/actions';
import handleError from '../../utils/error';
import { API_URL, CART_ITEM_STATUS } from '../../constants';
import { RootState } from '../../reducer';
import { Address } from '../Address/interface';

import {
    Order,
    // OrderItem,
    // OrderStatus,
    OrderState,
    UpdateOrderStatusAction,
    SetOrdersLoadingAction,
    FetchOrdersAction,
    FetchSearchedOrdersAction,
    FetchOrderAction,
    ClearOrdersAction,
    SetAdvancedFiltersAction,
    OrderActionTypes,
} from './interface';
import { toast } from 'react-toastify';
import toastConfig from '../../utils/toastConfig';
import { navigate, NavigateActionType } from "../Navigate";
import { PaymentActionTypes } from '../Payment/interface';
import { setPaymentLoading, setRazorpayOrderId } from '../Payment/actions';

export const updateOrderStatus = (value: { itemId: string; status: CART_ITEM_STATUS }): UpdateOrderStatusAction => {
    return {
        type: UPDATE_ORDER_STATUS,
        payload: value
    };
};

export const setOrderLoading = (value: boolean): SetOrdersLoadingAction => {
    return {
        type: SET_ORDERS_LOADING,
        payload: value
    };
};

export const fetchOrders = (page: number = 1) => {
    return async (dispatch: ThunkDispatch<RootState, null, OrderActionTypes>) => {
        try {
            dispatch(setOrderLoading(true));

            const response = await axios.get(`${API_URL}/order`, {
                params: {
                    page: page ?? 1,
                    limit: 20
                }
            });

            const { orders, totalPages, currentPage, count } = response.data;

            dispatch<FetchOrdersAction>({
                type: FETCH_ORDERS,
                payload: orders
            });

            dispatch<SetAdvancedFiltersAction>({
                type: SET_ADVANCED_FILTERS,
                payload: { totalPages, currentPage, count }
            });

        } catch (error) {
            dispatch(clearOrders());
            handleError(error, dispatch);
        } finally {
            dispatch(setOrderLoading(false));
        }
    };
};

export const fetchAccountOrders = (page: number = 1) => {
    return async (dispatch: ThunkDispatch<RootState, null, OrderActionTypes>) => {
        try {
            dispatch(setOrderLoading(true));

            const response = await axios.get(`${API_URL}/order/me`, {
                params: {
                    page: page ?? 1,
                    limit: 20
                }
            });

            const { orders, totalPages, currentPage, count } = response.data;

            dispatch<FetchOrdersAction>({
                type: FETCH_ORDERS,
                payload: orders
            });

            dispatch<SetAdvancedFiltersAction>({
                type: SET_ADVANCED_FILTERS,
                payload: { totalPages, currentPage, count }
            });
        } catch (error) {
            dispatch(clearOrders());
            handleError(error, dispatch);
        } finally {
            dispatch(setOrderLoading(false));
        }
    };
};

export const searchOrders = (filter: { value: string }) => {
    return async (dispatch: ThunkDispatch<RootState, null, OrderActionTypes>) => {
        try {
            dispatch(setOrderLoading(true));

            const response = await axios.get(`${API_URL}/order/search`, {
                params: {
                    search: filter.value
                }
            });

            dispatch<FetchSearchedOrdersAction>({
                type: FETCH_SEARCHED_ORDERS,
                payload: response.data.orders
            });

        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch(setOrderLoading(false));
        }
    };
};

export const fetchOrder = (id: string, withLoading: boolean = true) => {
    return async (dispatch: ThunkDispatch<RootState, null, OrderActionTypes>) => {
        try {
            if (withLoading) {
                dispatch(setOrderLoading(true));
            }

            const response = await axios.get(`${API_URL}/order/${id}`);

            dispatch<FetchOrderAction>({
                type: FETCH_ORDER,
                payload: response.data.order
            });

        } catch (error) {
            handleError(error, dispatch);
        } finally {
            if (withLoading) {
                dispatch(setOrderLoading(false));
            }
        }
    };
};

export const cancelOrder = () => {
    return async (dispatch: ThunkDispatch<RootState, null, OrderActionTypes | NavigateActionType>, getState: () => RootState) => {
        try {
            const order = getState().order.order;

            await axios.delete(`${API_URL}/order/cancel/${order._id}`);

            dispatch(navigate(`/dashboard/orders`));
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

export const updateOrderItemStatus = (itemId: string, status: CART_ITEM_STATUS) => {
    return async (dispatch: ThunkDispatch<RootState, null, OrderActionTypes | NavigateActionType>, getState: () => RootState) => {
        try {
            const order = getState().order.order;

            const response = await axios.put(
                `${API_URL}/order/status/item/${itemId}`,
                {
                    orderId: order._id,
                    cartId: order.cartId,
                    status
                }
            );

            if (response.data.orderCancelled) {
                dispatch(navigate(`/dashboard/orders`));
            } else {
                dispatch(updateOrderStatus({ itemId, status }));
                dispatch(fetchOrder(order._id, false));
            }

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            // dispatch(success(successfulOptions));
            toast.success(successfulOptions.title, toastConfig);

        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

export const addOrder = () => {
    return async (dispatch: ThunkDispatch<RootState, null, OrderActionTypes | NavigateActionType | PaymentActionTypes>, getState: () => RootState) => {
        try {

            dispatch(setPaymentLoading(true));
            const cartId = getState().order.cartId;
            // const total = getState().cart.cartTotal;
            // i have change selectedAddress to defaultAddress
            const address = getState().address.defaultAddress;
            // console.log("address", JSON.stringify(address, null, 2));

            if (cartId && address) {
                const response = await axios.post(`${API_URL}/order/add`, {
                    cartId,
                    // total,
                    address
                });

                // dispatch(navigate(`/order/success/${response.data.order._id}`));
                // dispatch(clearCart());
                console.log("i got all values from add order post", response.data.razorpayOrderID, response.data.razorpayId, response.data.order._id)
                dispatch(setRazorpayOrderId(response.data.razorpayOrderID, response.data.razorpayId, response.data.order._id, response.data.order.amount));


            } else {
                console.log('Cart is empty or address is not selected');
            }

        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch(setPaymentLoading(false));
        }
    };
};

export const placeOrder = (selectedAddress: Address) => {
    return (dispatch: ThunkDispatch<RootState, null, OrderActionTypes>, getState: () => RootState) => {
        const token = localStorage.getItem('token');
        const cartItems = getState().cart.cartItems;

        if (token && cartItems.length > 0) {
            Promise.all([dispatch(getCartId())]).then(() => {
                dispatch(addOrder());
            });
        }

        // dispatch(toggleCart());
    };
};

export const setCartIdForOrderToPlace = (cartId: string) => {
    return (dispatch: ThunkDispatch<RootState, null, OrderActionTypes>) => {
        console.log("setCartIdForOrderToPlace function", cartId);
        dispatch({
            type: SET_CART_ID_FOR_ORDER_TO_PLACE,
            payload: cartId,
        });
    }
}

export const clearOrders = (): ClearOrdersAction => {
    return {
        type: CLEAR_ORDERS
    };
};

export const setSelectedAddress = (address: Address) => {
    return (dispatch: ThunkDispatch<RootState, null, OrderActionTypes>) => {
        dispatch({
            type: SET_SELECTED_ADDRESS,
            payload: address
        });
    }
}