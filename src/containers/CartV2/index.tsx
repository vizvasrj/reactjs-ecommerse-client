import React from 'react';
import { Route, Routes } from 'react-router';
import OrderAddress from './OrderAddress';
import Cart from "../Cart";
// import OrderPayment from './Payment';
import Payment from '../Payment';
import OrderAddAddress from './OrderAddAddress';
import Edit from '../Address/Edit';
import Address from '../Address';
import Checkout from '../../components/Store/Checkout';

// Placeholder components for each step
// const Cart = () => <div>Cart</div>;
// const Address = () => <div>Address</div>;
// const Payment = () => <div>Payment</div>;
const Review = () => <div>Review</div>;
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducer';
import { toggleCart } from '../Navigation/actions';
import { CartActionTypes } from '../Cart/interface';
import { ToggleCartAction } from '../Navigation/interface';
import { handleShopping, handleCheckout } from '../Cart/actions';
import { ThunkDispatch } from 'redux-thunk';
import { navigate, NavigateActionType } from '../Navigate';

const CartV2: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, CartActionTypes | ToggleCartAction | NavigateActionType>>();
    const authenticated = useSelector((state: RootState) => state.authentication.authenticated);
    const handleHandleShopping = () => {
        dispatch(handleShopping());
    }
    const handlePlaceOrder = () => {
        if (location.pathname === '/cart/address') {
            dispatch(navigate('/cart/payment'));
        } else {
            dispatch(navigate('/cart/address'));
        }
    };
    const handleHandleCheckout = () => {
        dispatch(handleCheckout());
    }

    return (
        <div className='cart-page'>
            <Routes>
                <Route path="/" element={<Cart />} />
                {/* <Route path="/address" element={<OrderAddress />} /> */}
                <Route path="/address" element={<Address />} />
                {/* <Route path="/address/add" element={<OrderAddAddress />} />
                <Route path='/address/edit/:id' element={<Edit />} /> */}


                <Route path="/payment/*" element={<Payment />} />
                <Route path="/review" element={<Review />} />
            </Routes>
            <Checkout
                handleShopping={handleHandleShopping}
                handleCheckout={handleHandleCheckout}
                placeOrder={handlePlaceOrder}
                authenticated={authenticated}
            />

        </div>
    )
}

export default CartV2;