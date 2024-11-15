import React from 'react';
import { Container, Row, Col } from 'reactstrap';

interface CartSummaryProps {
    cartTotal: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartTotal }) => {
    return (
        <div className='cart-summary'>
            <Container>
                <Row className='mb-2 summary-item'>
                    <Col xs='9'>
                        <p className='summary-label'>Shipping</p>
                    </Col>
                    <Col xs='3' className='text-right'>
                        <p className='summary-value'>Free</p>
                    </Col>
                </Row>
                <Row className='mb-2 summary-item'>
                    <Col xs='9'>
                        <p className='summary-label'>Total</p>
                    </Col>
                    <Col xs='3' className='text-right'>
                        <p className='summary-value'>${cartTotal}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CartSummary;