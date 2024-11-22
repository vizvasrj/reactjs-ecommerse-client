import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROLES } from '../../constants';
import List from './List';
import Add from './Add';
import Edit from './Edit';
import Page404 from '../../components/Common/Page404';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer';
const Product: React.FC = () => {
    const user = useSelector((state: RootState) => state.account.user);
    return (
        <div className='product-dashboard'>
            <Routes>
                <Route path='/' element={<List />} />
                <Route path='/edit/:id' element={<Edit />} />
                {(user.role === ROLES.Admin || user.role === ROLES.Merchant) && (
                    <Route path='/add' element={<Add />} />
                )}
                <Route path='*' element={<Page404 />} />
            </Routes>
        </div>
    );
}


export default Product;