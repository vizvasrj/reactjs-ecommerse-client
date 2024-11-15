import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import AccountMenu from '../AccountMenu';
import Page404 from '../../Common/Page404';
import { isProviderAllowed } from '../../../utils/app';
import Account from '../../../containers/Account';
import AccountSecurity from '../../../containers/AccountSecurity';
import Address from '../../../containers/Address';
import Order from '../../../containers/Order';
import Wishlist from '../../../containers/WishList';
// import Cart from '../../../containers/Cart';
import CartV2 from '../../../containers/CartV2';
import OrderAddressForm from '../../../containers/OrderAddressForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reducer';
import { User } from '../../../containers/Users/models';
const Customer: React.FC = (props) => {
    const user = useSelector((state: RootState) => state.account.user) as User;

    return (
        <div className='customer'>
            <Row>
                <Col xs='12' md='5' xl='3'>
                    <AccountMenu {...props} />
                </Col>
                <Col xs='12' md='7' xl='9'>
                    <div className='panel-body'>
                        <Routes>
                            <Route path='/*' element={<Account />} />
                            {!isProviderAllowed(user.provider) && (
                                <Route path='/security' element={<AccountSecurity />} />
                            )}
                            <Route path='/address/*' element={<Address />} />
                            <Route path='/orders/*' element={<Order />} />
                            <Route path='/wishlist' element={<Wishlist />} />
                            <Route path='/cart' element={<CartV2 />} />
                            <Route path='/address-list' element={<OrderAddressForm />} />
                            <Route path='*' element={<Page404 />} />
                        </Routes>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Customer;