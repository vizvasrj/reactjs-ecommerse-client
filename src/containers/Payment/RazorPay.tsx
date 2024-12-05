import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { PaymentActionTypes } from './interface';
import Button from '../../components/Common/Button';
import { useNavigate } from 'react-router-dom';
import { OrderActionTypes } from '../Order/interface';
import { addOrder } from '../Order/actions';

function requireCartAndDefaultAddress(ComposedComponent: React.ComponentType<React.FC>) {
    return (props: any) => {
        const dispatch = useDispatch<ThunkDispatch<RootState, null, PaymentActionTypes>>();
        const { cartId } = useSelector((state: RootState) => state.order);
        const { defaultAddress } = useSelector((state: RootState) => state.address);
        const navigate = useNavigate();

        useEffect(() => {
            if (!cartId || !defaultAddress || Object.keys(defaultAddress).length === 0) {
                navigate('/cart', { replace: true });
            }
        }, [cartId, defaultAddress, dispatch, navigate]);

        return cartId && defaultAddress && Object.keys(defaultAddress).length > 0 ? <ComposedComponent {...props} /> : null;
    };
}

const RazorPay: React.FC = () => {
    const { cartId } = useSelector((state: RootState) => state.order);
    const { loading: isLoading, razorpay } = useSelector((state: RootState) => state.payment);
    const { defaultAddress } = useSelector((state: RootState) => state.address);
    const dispatch = useDispatch<ThunkDispatch<RootState, null, PaymentActionTypes | OrderActionTypes>>();
    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(addOrder())
    }, []);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => setIsRazorpayLoaded(true);
        script.onerror = () => console.error('Razorpay SDK failed to load');
        document.body.appendChild(script);
    }, []);

    const handlePayment = () => {
        if (!isRazorpayLoaded) {
            console.error('Razorpay SDK not loaded');
            return;
        }

        const options = {
            key: razorpay.key,
            amount: 10000,
            currency: 'INR',
            name: 'vizvasrj',
            description: 'a need for all',
            order_id: razorpay.razorPayOrderId,
            callback_url: 'http://127.0.0.1:8080/cart/payment/callback?order_id=' + razorpay.orderId,
            // redirect: true,
            notes: {
                "orderId": razorpay.orderId,
                "from": "frontend"
            },
            handler: (response: any) => {
                console.log(response.razorpay_payment_id, "response.razorpay_payment_id");
                console.log(response.razorpay_order_id, "response.razorpay_order_id");
                console.log(response.razorpay_signature, "response.razorpay_signature");
                console.log("i could redirect here.");
                navigate(`/cart/payment/callback?order_id=${razorpay.orderId}`);
            },
            theme: {
                color: '#F37254',
            },
        };

        const razorpayInstance = new (window as any).Razorpay(options);
        razorpayInstance.open();
    };

    return (
        <div>
            <Button text="cat id" onClick={() => { console.log("cartId", cartId, "defaultAddress", defaultAddress) }} />
            {(isLoading && isRazorpayLoaded) ? (
                <Button text="pay" disabled={true} />
            ) : (
                <Button text="Pay Now" onClick={handlePayment} disabled={!isRazorpayLoaded || isLoading} />
            )}
        </div>
    );
};

export default requireCartAndDefaultAddress(RazorPay);