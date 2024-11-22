import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentOrder } from './actions';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { PaymentActionTypes } from './interface';
import { load } from '@cashfreepayments/cashfree-js';
const PaymentRedirect: React.FC = () => {
    const [cashfree, setCashfree] = useState<any>(null);
    useEffect(() => {
        console.log("Cashfree loaded");
        const loadCashfree = async () => {
            const cashfree = await load({
                mode: "sandbox" //or production
            });
            console.log("cashfree", cashfree);
            setCashfree(cashfree);
        };
        loadCashfree();
    }, [])


    const dispatch = useDispatch<ThunkDispatch<RootState, null, PaymentActionTypes>>();
    const paymentLink = useSelector((state: RootState) => state.payment.paymentData.paymentLink);
    const paymentSessionId = "session_tUWXh0nr6_Ksyek_Qi9DtZBhuA2egPGb75_IUwDKnxDQNpMKOiVb1QxJX4bqLKN3WkViw3_7rPj6Piar95ganVBDI0zyY4pKMjPh3ASxRlvc"
    const doPayment = async () => {
        console.log("doPayment");
        let checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: "_self",
        };
        console.log("checkoutOptions", checkoutOptions);
        cashfree?.checkout(checkoutOptions);
    }
    // useEffect(() => {
    //     const generateRandomOrderId = () => {
    //         return 'order_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    //     };

    //     const mockOrderData = {
    //         orderId: generateRandomOrderId(),
    //         amount: 1000, // Example amount
    //         currency: 'INR', // Example currency
    //         customerDetails: {
    //             name: 'John Doe',
    //             email: 'john.doe@example.com',
    //             address: '123 Main St, Anytown, USA'
    //         }
    //     };

    //     localStorage.setItem('orderId', mockOrderData.orderId);

    //     dispatch(createPaymentOrder(mockOrderData));
    // }, [dispatch, createPaymentOrder]);

    // useEffect(() => {
    //     if (paymentLink) {
    //         const timer = setTimeout(() => {
    //             window.location.href = paymentLink;
    //         }, 3000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [paymentLink]);


    return (
        <div>
            <h2>Redirecting to Cashfree...</h2>
            <p>Please wait while we process your payment.</p>
            <p>If you are not redirected, <a href={paymentLink}>click here</a> to proceed.</p>
            <button onClick={doPayment}>Cashfree version</button>
        </div>
    );
};

export default PaymentRedirect;