import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROLES } from '../../constants';
import List from './List';
import Customer from './Customer';
import Page404 from '../../components/Common/Page404';
import { useSelector, } from 'react-redux';
import { RootState } from '../../reducer';

const Order = () => {
    const user = useSelector((state: RootState) => state.account.user);
    return (
        <div className='product-dashboard'>
            <Routes>
                <Route path='/' element={<List />} />
                {user.role === ROLES.Admin && (
                    <Route
                        path='/customers'
                        element={<Customer />}
                    />
                )}
                <Route path='*' element={<Page404 />} />
            </Routes>
        </div>
    );

}

export default Order;