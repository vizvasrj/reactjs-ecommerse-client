import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ROLES } from '../../constants';
import List from './List';
import Add from './Add';
import Page404 from '../../components/Common/Page404';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer';


const Merchant: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.account);

    return (
        <div className='merchant-dashboard'>
            <Routes>
                <Route path='/' element={<List />} />
                {user.role === ROLES.Admin && (
                    <Route path='/add' element={<Add />} />
                )}
                <Route path='*' element={<Page404 />} />
            </Routes>
        </div>
    );
}


export default Merchant;