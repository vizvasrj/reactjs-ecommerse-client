
import {
    HANDLE_CART,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    HANDLE_CART_TOTAL,
    SET_CART_ID,
    CLEAR_CART
} from './constants';


import { Action } from 'redux';
import { Product } from '../Product/interface';

export interface CartItem extends Product {
    quantity: number;
    totalPrice: number;

}

export interface CartState {
    cartItems: CartItem[];
    cartTotal: number;
    cartId: string | null;
}

export interface HandleCartAction extends Action {
    type: typeof HANDLE_CART;
    payload: CartState;
}

export interface AddToCartAction extends Action {
    type: typeof ADD_TO_CART;
    payload: CartItem;
}

export interface RemoveFromCartAction extends Action {
    type: typeof REMOVE_FROM_CART;
    payload: CartItem;
}

export interface HandleCartTotalAction extends Action {
    type: typeof HANDLE_CART_TOTAL;
    payload: number;
}

export interface SetCartIdAction extends Action {
    type: typeof SET_CART_ID;
    payload: string;
}

export interface ClearCartAction extends Action {
    type: typeof CLEAR_CART;
}

export type CartActionTypes =
    | HandleCartAction
    | AddToCartAction
    | RemoveFromCartAction
    | HandleCartTotalAction
    | SetCartIdAction
    | ClearCartAction;