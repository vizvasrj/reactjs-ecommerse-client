import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { OrderActionTypes, Order } from '../Order/interface';
import { fetchOrder } from '../Order/actions';


const OrderSuccess = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, OrderActionTypes>>();

    const order = useSelector((state: RootState) => state.order.order) as Order;
    const isLoading = useSelector((state: RootState) => state.order.isLoading) as boolean;

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


    return (
        <div className='order-success'>
            {isLoading ? (
                <LoadingIndicator />
            ) : order._id ? (
                <div className='order-message'>
                    <h2>Thank you for your order.</h2>
                    <p>
                        Order{' '}
                        <Link
                            to={{
                                pathname: `/order/${order._id}`,
                                // search: '?success',
                            }}
                            className='order-label'
                        >
                            #{order._id}
                        </Link>{' '}
                        is complete.
                    </p>
                    <p>A confirmation email will be sent to you shortly.</p>
                    <div className='order-success-actions'>
                        <Link to='/dashboard/orders' className='btn-link'>
                            Manage Orders
                        </Link>
                        <Link to='/shop' className='btn-link shopping-btn'>
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            ) : (
                <NotFound message='No order found.' />
            )}
        </div>
    );

}


export default OrderSuccess;