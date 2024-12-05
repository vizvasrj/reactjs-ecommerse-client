import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentOrder } from './actions';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { PaymentActionTypes } from './interface';
import { load } from '@cashfreepayments/cashfree-js';
import { navigate, NavigateActionType } from '../Navigate';
import Button from '../../components/Common/Button';
import { useNavigate } from 'react-router-dom';

function requireCartAndDefaultAddress(ComposedComponent: React.ComponentType<React.FC>) {
    return (props: any) => {
        const dispatch = useDispatch<ThunkDispatch<RootState, null, PaymentActionTypes | NavigateActionType>>();
        const { cartId } = useSelector((state: RootState) => state.order);
        const { defaultAddress } = useSelector((state: RootState) => state.address);
        const history = useNavigate();

        useEffect(() => {
            if (!cartId || !defaultAddress || Object.keys(defaultAddress).length === 0) {
                // dispatch(navigate('/cart'));
                history('/', { replace: true });
            }
        }, [cartId, defaultAddress, dispatch, history]);

        return cartId && defaultAddress && Object.keys(defaultAddress).length > 0 ? <ComposedComponent {...props} /> : null;
    };
}


const PaymentRedirect: React.FC = () => {
    const [cashfree, setCashfree] = useState<any>(null);
    const { cartId } = useSelector((state: RootState) => state.order);
    const { defaultAddress } = useSelector((state: RootState) => state.address);
    const dispatch = useDispatch<ThunkDispatch<RootState, null, PaymentActionTypes | NavigateActionType>>();

    useEffect(() => {
        const loadCashfree = async () => {
            try {
                const cashfree = await load({ mode: "sandbox" });
                setCashfree(cashfree);
            } catch (error) {
                console.error("Error loading Cashfree", error);
            }
        };
        loadCashfree();
    }, []);


    const paymentLink = useSelector((state: RootState) => state.payment.paymentData.paymentLink);
    const paymentSessionId = "session_KPrLfcFKSJXuzy0IAfnaaIEN7iqx4eFQMuq8M2dEaRfkQls9yKIcM4Mf1fauwcBgG39pVwwr6RUM3fz7t6YfEWJfjO5EsBIsY7zjgK_cT459";

    const doPayment = async () => {
        const checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: "_self",
        };
        cashfree?.checkout(checkoutOptions);
    };

    if (!cartId || !defaultAddress) {
        return null;
    }

    return (
        <div>
            <Button text="cat id" onClick={() => { console.log("cartId", cartId, "defaultAddress", defaultAddress) }} />
            <h2>Redirecting to Cashfree...</h2>
            <p>Please wait while we process your payment.</p>
            <p>If you are not redirected, <a href={paymentLink}>click here</a> to proceed.</p>
            <button onClick={doPayment}>Cashfree version</button>
        </div>
    );
};

export default requireCartAndDefaultAddress(PaymentRedirect);