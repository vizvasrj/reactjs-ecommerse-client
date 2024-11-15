// import { push } from 'connected-react-router';
// import { success } from 'react-notification-system-redux';
import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import {
    HANDLE_CART,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    HANDLE_CART_TOTAL,
    SET_CART_ID,
    CLEAR_CART
} from './constants';

import {
    SET_PRODUCT_SHOP_FORM_ERRORS,
    RESET_PRODUCT_SHOP
} from '../Product/constants';

import { API_URL, CART_ID, CART_ITEMS, CART_TOTAL } from '../../constants';
import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import { toggleCart } from '../Navigation/actions';
import { RootState } from '../../reducer';
import { Product } from '../Product/interface';
import {
    CartItem,
    CartState,
    HandleCartAction,
    AddToCartAction,
    RemoveFromCartAction,
    HandleCartTotalAction,
    SetCartIdAction,
    ClearCartAction,
    CartActionTypes
} from './interface';
import { ProductActionTypes } from '../Product/interface';
import { ToggleCartAction } from '../Navigation/interface';
import { navigate, NavigateActionType } from "../Navigate";
import { toast } from 'react-toastify';
import toastConfig from '../../utils/toastConfig';

// Handle Add To Cart
export const handleAddToCart = (product: Product) => {
    return (dispatch: ThunkDispatch<RootState, null, CartActionTypes | ToggleCartAction | ProductActionTypes>, getState: () => RootState) => {
        const productShopData = getState().product.productShopData;
        const quantity = Number(productShopData.quantity);
        if (product.price) {
            const totalPrice = quantity * product.price;

            const updatedProduct: CartItem = {
                ...product,
                quantity,
                totalPrice: parseFloat(totalPrice.toFixed(2))
            };

            const inventory = getState().product.storeProduct.inventory;
            let result = 0;
            if (inventory !== undefined) {
                result = calculatePurchaseQuantity(inventory);
            }


            const rules = {
                quantity: `min:1|max:${result}`
            };

            const { isValid, errors } = allFieldsValidation(
                { quantity: updatedProduct.quantity }, // Validate only quantity
                rules,
                {
                    'min.quantity': 'Quantity must be at least 1.',
                    'max.quantity': `Quantity may not be greater than ${result}.`
                }
            );

            if (!isValid && errors) {
                return dispatch({ type: SET_PRODUCT_SHOP_FORM_ERRORS, payload: errors });
            }

            dispatch({
                type: RESET_PRODUCT_SHOP
            });

            dispatch<AddToCartAction>({
                type: ADD_TO_CART,
                payload: updatedProduct
            });

            const cartItems = JSON.parse(localStorage.getItem(CART_ITEMS) || '[]') as CartItem[];
            const newCartItems = [...cartItems, updatedProduct];
            localStorage.setItem(CART_ITEMS, JSON.stringify(newCartItems));

            dispatch(calculateCartTotal());
            dispatch(toggleCart());
        }
    };
};

// Handle Remove From Cart
export const handleRemoveFromCart = (product: CartItem) => {

    return (dispatch: ThunkDispatch<RootState, null, CartActionTypes>) => {
        const cartItems = JSON.parse(localStorage.getItem(CART_ITEMS) || '[]') as CartItem[];
        const newCartItems = cartItems.filter(item => item._id !== product._id);
        localStorage.setItem(CART_ITEMS, JSON.stringify(newCartItems));

        dispatch<RemoveFromCartAction>({
            type: REMOVE_FROM_CART,
            payload: product
        });
        dispatch(calculateCartTotal());
        // dispatch(toggleCart());
    };
};

export const calculateCartTotal = () => {
    return (dispatch: ThunkDispatch<RootState, null, CartActionTypes>, getState: () => RootState) => {
        const cartItems = getState().cart.cartItems;

        let total = 0;

        cartItems.map(item => {
            if (item.price) {
                total += item.price * item.quantity;
            }
        });

        total = parseFloat(total.toFixed(2));
        localStorage.setItem(CART_TOTAL, total.toString()); // Store as string
        dispatch<HandleCartTotalAction>({
            type: HANDLE_CART_TOTAL,
            payload: total
        });
    };
};

// set cart store from local storage
export const handleCart = () => {
    const cart = {
        cartItems: JSON.parse(localStorage.getItem(CART_ITEMS) || '[]') as CartItem[],
        cartTotal: parseFloat(localStorage.getItem(CART_TOTAL) || '0'), // Parse as float
        cartId: localStorage.getItem(CART_ID)
    };

    return (dispatch: ThunkDispatch<RootState, null, CartActionTypes>) => {
        if (cart.cartItems.length > 0) { // Check if cartItems is not empty
            dispatch<HandleCartAction>({
                type: HANDLE_CART,
                payload: cart
            });
            dispatch(calculateCartTotal());
        }
    };
};

export const handleCheckout = () => {
    return (dispatch: ThunkDispatch<RootState, null, CartActionTypes | ToggleCartAction | NavigateActionType>) => {
        const successfulOptions = {
            title: `Please Login to proceed to checkout`,
            position: 'tr',
            autoDismiss: 1
        };

        dispatch(toggleCart());
        // dispatch(push('/login'));
        dispatch(navigate('/login'));
        // dispatch(success(successfulOptions));
        toast.success(successfulOptions.title, toastConfig);
    };
};

// Continue shopping use case
export const handleShopping = () => {
    return (dispatch: ThunkDispatch<RootState, null, CartActionTypes | ToggleCartAction | NavigateActionType>) => {
        // dispatch(push('/shop'));
        dispatch(navigate('/shop'));
        dispatch(toggleCart());
    };
};

// create cart id api
export const getCartId = () => {
    return async (dispatch: ThunkDispatch<RootState, null, CartActionTypes>, getState: () => RootState) => {
        try {
            const cartId = localStorage.getItem(CART_ID);
            const cartItems = getState().cart.cartItems;
            const products = getCartItems(cartItems);

            // create cart id if there is no one
            if (!cartId) {
                const response = await axios.post(`${API_URL}/cart/add`, { products });

                dispatch(setCartId(response.data.cartId));
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

export const setCartId = (cartId: string) => {
    return (dispatch: ThunkDispatch<RootState, null, CartActionTypes>) => {
        localStorage.setItem(CART_ID, cartId);
        dispatch<SetCartIdAction>({
            type: SET_CART_ID,
            payload: cartId
        });
    };
};

export const clearCart = () => {
    return (dispatch: ThunkDispatch<RootState, null, CartActionTypes>) => {
        localStorage.removeItem(CART_ITEMS);
        localStorage.removeItem(CART_TOTAL);
        localStorage.removeItem(CART_ID);

        dispatch<ClearCartAction>({
            type: CLEAR_CART
        });
    };
};

const getCartItems = (cartItems: CartItem[]) => {
    const newCartItems: { quantity: number, price: number, taxable: boolean, product: string }[] = [];
    cartItems.map(item => {
        const newItem = {
            quantity: item.quantity || 1,
            price: item.price || 0,
            taxable: item.taxable || false,
            product: item._id
        } as { quantity: number, price: number, taxable: boolean, product: string };
        newCartItems.push(newItem);
    });

    return newCartItems;
};

const calculatePurchaseQuantity = (inventory: number): number => {
    if (inventory <= 25) {
        return 1;
    } else if (inventory > 25 && inventory <= 100) {
        return 5;
    } else if (inventory > 100 && inventory < 500) {
        return 25;
    } else {
        return 50;
    }
};