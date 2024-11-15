import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/date';
import { Order } from '../../../containers/Order/interface';
// interface Order {
//     _id: string;
//     products?: {
//         product: {
//             imageUrl?: string;
//         };
//         status: string;
//     }[];
//     created: Date;
//     totalWithTax?: number;
// }

interface OrderListProps {
    orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
    const renderFirstItem = (order: Order) => {
        if (order.products) {
            const product = order.products[0].product;
            return (
                <img
                    className='item-image'
                    src={`${product && product?.imageUrl
                        ? product?.imageUrl
                        : '/images/placeholder-image.png'
                        }`}
                />
            );
        } else {
            return <img className='item-image' src='/images/placeholder-image.png' />;
        }
    };

    return (
        <div className='order-list'>
            {orders.map((order, index) => (
                <div key={index} className='order-box'>
                    <Link to={`/order/${order._id}`} className='d-block box-link'>
                        <div className='d-flex flex-column flex-lg-row mb-3'>
                            <div className='order-first-item p-lg-3'>
                                {renderFirstItem(order)}
                            </div>
                            <div className='d-flex flex-column flex-xl-row justify-content-between flex-1 ml-lg-2 mr-xl-4 p-3'>
                                <div className='order-details'>
                                    <div className='mb-1'>
                                        <span>Status</span>
                                        {order?.products ? (
                                            <span className='order-label order-status'>{` ${order?.products[0].status}`}</span>
                                        ) : (
                                            <span className='order-label order-status'>{` Unavailable`}</span>
                                        )}
                                    </div>
                                    <div className='mb-1'>
                                        <span>Order #</span>
                                        <span className='order-label'>{` ${order._id}`}</span>
                                    </div>
                                    <div className='mb-1'>
                                        <span>Ordered on</span>
                                        <span className='order-label'>{` ${formatDate(
                                            order.created.toString()
                                        )}`}</span>
                                    </div>
                                    <div className='mb-1'>
                                        <span>Order Total</span>
                                        <span className='order-label'>{` ₹${order?.total ? order?.total : 0
                                            }`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default OrderList;