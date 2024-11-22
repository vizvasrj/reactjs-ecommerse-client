import React from 'react';
import { Row, Col } from 'reactstrap';
import OrderMeta from '../OrderMeta';
import OrderItems from '../OrderItems';
import OrderSummary from '../OrderSummary';
import { CART_ITEM_STATUS } from '../../../constants';
// import { OrderStatus } from '../../../containers/Order/interface';

interface OrderDetailsProps {
    order: any;
    user: any;
    cancelOrder: () => void;
    updateOrderItemStatus: (itemId: string, status: CART_ITEM_STATUS) => void;
    onBack: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
    order,
    user,
    cancelOrder,
    updateOrderItemStatus,
    onBack,
}) => {
    return (
        <div className='order-details'>
            <Row>
                <Col xs='12' md='12'>
                    <OrderMeta order={order} cancelOrder={cancelOrder} onBack={onBack} />
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col xs='12' lg='8'>
                    <OrderItems
                        order={order}
                        user={user}
                        cancelOrder={cancelOrder}
                        updateOrderItemStatus={updateOrderItemStatus}
                    />
                </Col>
                <Col xs='12' lg='4' className='mt-5 mt-lg-0'>
                    <OrderSummary order={order} />
                </Col>
            </Row>
        </div>
    );
};

export default OrderDetails;