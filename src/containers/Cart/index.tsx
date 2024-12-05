import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// import actions from '../../actions';

import CartList from '../../components/Store/CartList';
import CartSummary from '../../components/Store/CartSummary';
import Checkout from '../../components/Store/Checkout';
import { BagIcon, CloseIcon } from '../../components/Common/Icon';
import Button from '../../components/Common/Button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducer';
import { toggleCart } from '../Navigation/actions';
import { handleRemoveFromCart } from './actions';
import { placeOrder } from '../Order/actions';
import { CartActionTypes, CartItem } from './interface';
import { ToggleCartAction } from '../Navigation/interface';
import requireAuth from '../Authentication';
import { handleShopping, handleCheckout, getCartByCartID } from './actions';
import { ThunkDispatch } from 'redux-thunk';
import { navigate, NavigateActionType } from '../Navigate';
import { setCartIdForOrderToPlace } from '../Order/actions';
import { SetCartIdForOrderToPlaceAction } from '../Order/interface';
const Cart: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, CartActionTypes | ToggleCartAction | NavigateActionType | SetCartIdForOrderToPlaceAction>>();

    const { cartTotal, cartId } = useSelector((state: RootState) => state.cart);
    const { cartId: cartIdForOrderToPlace } = useSelector((state: RootState) => state.order);
    const { isCartOpen } = useSelector((state: RootState) => state.navigation);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        dispatch(getCartByCartID(setCartItems));
    }, []);

    const authenticated = useSelector((state: RootState) => state.authentication.authenticated);
    const handleHandleShopping = () => {
        dispatch(handleShopping());
    }
    const handlePlaceOrder = () => {
        dispatch(navigate("/cart/address"));
    }
    const handleHandleCheckout = () => {
        dispatch(handleCheckout());
    }

    const handleToggleCart = () => {
        dispatch(toggleCart());
    }

    useEffect(() => {
        dispatch(setCartIdForOrderToPlace(cartId));
    }, [cartId])
    return (
        <div className='cart'>
            <div className='cart-header'>
                {isCartOpen && (
                    <Button
                        borderless
                        variant='empty'
                        ariaLabel='close the cart'
                        icon={<CloseIcon />}
                        onClick={handleToggleCart}
                    />
                )}
            </div>
            {cartItems.length > 0 ? (
                <div className='cart-body'>
                    <CartList
                        // toggleCart={toggleCart}
                        cartItems={cartItems}
                    // handleRemoveFromCart={handleRemoveFromCart}
                    />
                </div>
            ) : (
                <div className='empty-cart'>
                    <BagIcon />
                    <p>Your shopping cart is empty</p>
                </div>
            )}
            {cartItems.length > 0 && (
                <div className='cart-checkout'>
                    <CartSummary cartTotal={cartTotal} />
                    {/* <Checkout
                        handleShopping={handleHandleShopping}
                        handleCheckout={handleHandleCheckout}
                        placeOrder={handlePlaceOrder}
                        authenticated={authenticated}
                    /> */}
                </div>
            )}
        </div>
    );
    // }
}


export default requireAuth(Cart);