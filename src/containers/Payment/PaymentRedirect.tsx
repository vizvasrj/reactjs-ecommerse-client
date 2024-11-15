import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentOrder } from './actions';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { PaymentActionTypes } from './interface';

const PaymentRedirect: React.FC = () => {


    const dispatch = useDispatch<ThunkDispatch<RootState, null, PaymentActionTypes>>();
    const paymentLink = useSelector((state: RootState) => state.payment.paymentData.paymentLink);


    useEffect(() => {
        const generateRandomOrderId = () => {
            return 'order_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        };

        const mockOrderData = {
            orderId: generateRandomOrderId(),
            amount: 1000, // Example amount
            currency: 'INR', // Example currency
            customerDetails: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                address: '123 Main St, Anytown, USA'
            }
        };

        localStorage.setItem('orderId', mockOrderData.orderId);

        dispatch(createPaymentOrder(mockOrderData));
    }, [dispatch, createPaymentOrder]);

    useEffect(() => {
        if (paymentLink) {
            const timer = setTimeout(() => {
                window.location.href = paymentLink;
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [paymentLink]);


    return (
        <div>
            <h2>Redirecting to Cashfree...</h2>
            <p>Please wait while we process your payment.</p>
            <p>If you are not redirected, <a href={paymentLink}>click here</a> to proceed.</p>
        </div>
    );
};

export default PaymentRedirect;