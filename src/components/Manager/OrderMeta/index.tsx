import React from 'react';
import { Row, Col } from 'reactstrap';
import { CART_ITEM_STATUS } from '../../../constants';
import { formatDate } from '../../../utils/date';
import Button from '../../Common/Button';
import { ArrowBackIcon } from '../../Common/Icon';
import { Order, OrderProduct } from '../../../containers/Order/interface';

interface OrderMetaProps {
    order: Order;
    cancelOrder: () => void;
    onBack: () => void;
}

const OrderMeta: React.FC<OrderMetaProps> = ({ order, cancelOrder, onBack }) => {
    const renderMetaAction = () => {
        const isNotDelivered =
            order.products.filter((i: OrderProduct) => i.status === CART_ITEM_STATUS.Delivered)
                .length < 1;

        if (isNotDelivered) {
            return <Button size='sm' text='Cancel Order' onClick={cancelOrder} />;
        }
    };

    return (
        <div className='order-meta'>
            <div className='d-flex align-items-center justify-content-between mb-3 title'>
                <h2 className='mb-0'>Order Details</h2>
                <Button
                    variant='link'
                    icon={<ArrowBackIcon />}
                    size='sm'
                    text='Back to orders'
                    onClick={onBack}
                ></Button>
            </div>

            <Row>
                <Col xs='12' md='8'>
                    <Row>
                        <Col xs='4'>
                            <p className='one-line-ellipsis'>Order ID</p>
                        </Col>
                        <Col xs='8'>
                            <span className='order-label one-line-ellipsis'>{` ${order._id}`}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='4'>
                            <p className='one-line-ellipsis'>Order Date</p>
                        </Col>
                        <Col xs='8'>
                            <span className='order-label one-line-ellipsis'>{` ${formatDate(
                                order.createdAt
                            )}`}</span>
                        </Col>
                    </Row>
                    {order.shippingAddress && (
                        <Row>
                            <Col xs='4'>
                                <p className='one-line-ellipsis'>Order Address</p>
                            </Col>
                            <Col xs='8'>
                                {/* <span className='order-label one-line-ellipsis'>{` ${order.shippingAddress.address}`}</span> */}
                                <span className='order-label one-line-ellipsis'>{` ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.country}`}</span>
                                <span className='order-label one-line-ellipsis'>{` ${order.shippingAddress.zipCode}`}</span>
                            </Col>
                        </Row>
                    )}
                </Col>
                <Col xs='12' md='4' className='text-left text-md-right'>
                    {renderMetaAction()}
                </Col>
            </Row>
        </div>
    );
};

export default OrderMeta;