import React, { Component, useEffect, useRef } from 'react';
import OrderDetails from '../../components/Manager/OrderDetails';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { fetchOrder, cancelOrder, updateOrderItemStatus } from '../Order/actions';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { OrderActionTypes } from '../Order/interface';
import { Order } from '../Order/interface';
import { User } from '../Account/interface';
import { CART_ITEM_STATUS } from '../../constants';



const OrderPage: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, OrderActionTypes>>();
    const order = useSelector((state: RootState) => state.order.order) as Order;
    const user = useSelector((state: RootState) => state.account.user) as User;
    const isLoading = useSelector((state: RootState) => state.order.isLoading) as boolean;

    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const prevIdRef = useRef<string | undefined>();

    useEffect(() => {
        if (id) {
            dispatch(fetchOrder(id));
        }

        if (id && id !== prevIdRef.current) {
            dispatch(fetchOrder(id));
        }

        prevIdRef.current = id;

        return () => {
            // cleanup
        }
    }, [fetchOrder, id]);

    const handleUpdateOrderItemStatus = (itemId: string, status: CART_ITEM_STATUS) => {
        dispatch(updateOrderItemStatus(itemId, status));
    }


    return (
        <div className='order-page'>
            {isLoading ? (
                <LoadingIndicator backdrop />
            ) : order._id ? (
                <OrderDetails
                    order={order}
                    user={user}
                    cancelOrder={cancelOrder}
                    updateOrderItemStatus={handleUpdateOrderItemStatus}
                    onBack={() => {
                        if (window.location.toString().includes('success')) {
                            // history.push('/dashboard/orders');
                            navigate('/dashboard/orders');
                        } else {
                            // history.goBack();
                            navigate(-1);
                        }
                    }}
                />
            ) : (
                <NotFound message='No order found.' />
            )}
        </div>
    );

}


export default OrderPage;