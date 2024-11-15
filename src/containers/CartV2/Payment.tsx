import React from 'react';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

const OrderPayment: React.FC = () => {
    return (
        <>
            <SubPage
                title="Payment"
                actionTitle='Add payment method'
                handleAction={() => console.log('Add payment')}
            >
                <NotFound message='No payment methods found.' />
            </SubPage>
        </>
    )
}

export default OrderPayment;