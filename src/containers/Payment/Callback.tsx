import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducer";
import { PaymentActionTypes } from "./interface";
import { ThunkDispatch } from "redux-thunk";
import { navigate, NavigateActionType } from "../Navigate";
import { getPaymentStatus } from "./actions";
import { useEffect } from "react";
import { CircularProgress, Card, CardContent, Typography } from '@mui/material';


const Callback: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, PaymentActionTypes | NavigateActionType>>();
    const orderCallbackData = useSelector((state: RootState) => state.payment.orderCallbackData);
    const loading = useSelector((state: RootState) => state.payment.loading);

    // * this should be something more state
    const orderId = localStorage.getItem('orderId');

    useEffect(() => {
        if (orderId) {
            dispatch(getPaymentStatus(orderId));
        }
    }, [orderId, dispatch]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {loading ? (
                <CircularProgress />
            ) : (
                orderCallbackData ? (
                    <Card style={{ maxWidth: 600, padding: '20px' }}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Payment Status
                            </Typography>
                            <Typography color="textSecondary">
                                Order ID: {orderCallbackData.order.id}
                            </Typography>
                            <Typography color="textSecondary">
                                Transaction Status: {orderCallbackData.order.status}
                            </Typography>
                            <Typography color="textSecondary">
                                Amount: {orderCallbackData.order.amount}
                            </Typography>
                            <Typography color="textSecondary">
                                Payment Method: {orderCallbackData.order.paymentMethod}
                            </Typography>
                        </CardContent>
                    </Card>
                ) : (
                    <Typography variant="h6" component="p">
                        No order callback data available.
                    </Typography>
                )
            )}
        </div>
    );
}

export default Callback;
