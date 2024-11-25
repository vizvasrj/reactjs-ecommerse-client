import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Button from '../../Common/Button';
import { CartItem } from '../../../containers/Cart/interface';
import { toggleCart } from '../../../containers/Navigation/actions';
import { handleRemoveFromCart } from '../../../containers/Cart/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../reducer';
import { CartActionTypes } from '../../../containers/Cart/interface';
import { ToggleCartAction } from '../../../containers/Navigation/interface';
import { TrashIcon } from '../../Common/Icon';
// interface CartItem {
//     imageUrl: string;
//     slug: string;
//     name: string;
//     totalPrice: number;
//     quantity: number;
// }

interface CartListProps {
    cartItems: CartItem[];
    // handleRemoveFromCart: (item: CartItem) => void;
    // toggleCart: () => void;
}

const CartList: React.FC<CartListProps> = ({ cartItems }) => {
    // const {
    //     // cartItems,
    //     // handleRemoveFromCart
    // } = props;
    // const { cartItems } = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch<ThunkDispatch<RootState, null, CartActionTypes | ToggleCartAction>>();

    const handleRemoveFromCartFunction = (item: CartItem) => {
        dispatch(handleRemoveFromCart(item));
    }

    const handleProductClick = () => {
        dispatch(toggleCart());
    };

    return (
        <div className='cart-list'>
            {cartItems.map((item, index) => (
                <div key={index} className='item-box'>
                    <div className='item-details'>
                        <Container>
                            <Row className='mb-2 align-items-center'>
                                <Col xs='10' className='pr-0'>
                                    <div className='d-flex align-items-center'>
                                        <img
                                            className='item-image mr-2'
                                            src={`${item.imageUrl ? item.imageUrl : '/images/placeholder-image.png'}`}
                                        />

                                        <Link
                                            to={`/product/${item.slug}`}
                                            className='item-link one-line-ellipsis'
                                            onClick={handleProductClick}
                                        >
                                            <h2 className='item-name one-line-ellipsis'>{item.name}</h2>
                                        </Link>
                                    </div>
                                </Col>
                                <Col xs='2' className='text-right'>
                                    <Button
                                        // text='remove'
                                        borderless
                                        variant='empty'
                                        ariaLabel={`remove ${item.name} from cart`}
                                        icon={<TrashIcon />}
                                        onClick={() => handleRemoveFromCartFunction(item)}
                                    />
                                </Col>
                            </Row>
                            <Row className='mb-2 align-items-center'>
                                <Col xs='9'>
                                    <p className='item-label'>price</p>
                                </Col>
                                <Col xs='3' className='text-right'>
                                    <p className='value price'>{` ₹${item?.totalPrice}`}</p>
                                </Col>
                            </Row>
                            <Row className='mb-2 align-items-center'>
                                <Col xs='9'>
                                    <p className='item-label'>quantity</p>
                                </Col>
                                <Col xs='3' className='text-right'>
                                    <p className='value quantity'>{` ${item.quantity}`}</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartList;