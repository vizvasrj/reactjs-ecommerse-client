import {
    FETCH_ORDERS,
    FETCH_SEARCHED_ORDERS,
    FETCH_ORDER,
    UPDATE_ORDER_STATUS,
    SET_ORDERS_LOADING,
    SET_ADVANCED_FILTERS,
    CLEAR_ORDERS,
    SET_SELECTED_ADDRESS
} from './constants';

import { Product } from '../Product/interface';

import { Action } from 'redux';
import { Address } from '../Address/interface';
import { CART_ITEM_STATUS } from '../../constants';

// export enum OrderStatus {
//     Waiting = 'Waiting',
//     Delivered = 'Delivered',
//     Shipped = 'Shipped',
//     Cancelled = 'Cancelled'
// }

// export interface OrderItem {
//     _id: string;
//     product: string;
//     quantity: number;
//     salePrice: number;
//     status: OrderStatus;
// }

export interface OrderProduct {
    product: Product;
    purchasePrice: number;
    status: string;
    quantity: number;
    totalPrice: number;

}

export interface Order {
    _id: string;
    user: {
        _id: string;
        email: string;
    };
    products: OrderProduct[];
    total: number;
    coupon: {
        _id: string;
        discount: number;
    };
    paymentMethod: string;
    shippingAddress: {
        address1: string;
        address2: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    billingAddress: {
        address1: string;
        address2: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    status: CART_ITEM_STATUS;
    created: string;
    updated: string;
    totalTax: number;
    totalWithTax: number;
    cartId: string;
}

export interface OrderState {
    orders: Order[];
    searchedOrders: Order[];
    order: Order | null;
    selectedAddress: {
        _id: string;
        firstName: string;
        lastName: string;
        address1: string;
        address2: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        mobile: string;
    } | null,
    isLoading: boolean;
    advancedFilters: {
        totalPages: number;
        currentPage: number;
        count: number;
    };
}

export interface UpdateOrderStatusAction extends Action {
    type: typeof UPDATE_ORDER_STATUS;
    payload: { itemId: string; status: CART_ITEM_STATUS };
}

export interface SetOrdersLoadingAction extends Action {
    type: typeof SET_ORDERS_LOADING;
    payload: boolean;
}

export interface FetchOrdersAction extends Action {
    type: typeof FETCH_ORDERS;
    payload: Order[];
}

export interface FetchSearchedOrdersAction extends Action {
    type: typeof FETCH_SEARCHED_ORDERS;
    payload: Order[];
}

export interface FetchOrderAction extends Action {
    type: typeof FETCH_ORDER;
    payload: Order;
}

export interface ClearOrdersAction extends Action {
    type: typeof CLEAR_ORDERS;
}

export interface SetAdvancedFiltersAction extends Action {
    type: typeof SET_ADVANCED_FILTERS;
    payload: {
        totalPages: number;
        currentPage: number;
        count: number;
    };
}

export interface SetSelectedAddressAction extends Action {
    type: typeof SET_SELECTED_ADDRESS;
    payload: Address
}

export type OrderActionTypes =
    | UpdateOrderStatusAction
    | SetOrdersLoadingAction
    | FetchOrdersAction
    | FetchSearchedOrdersAction
    | FetchOrderAction
    | ClearOrdersAction
    | SetAdvancedFiltersAction
    | SetSelectedAddressAction;