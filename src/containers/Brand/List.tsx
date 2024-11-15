import React, { useEffect } from 'react';
import { fetchBrands } from './actions';
import { ROLES } from '../../constants';
import BrandList from '../../components/Manager/BrandList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducer';
// import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { BrandActionTypes } from './actions';
import { navigate, NavigateActionType } from '../Navigate';

const List: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, BrandActionTypes | NavigateActionType>>();
    useEffect(() => {
        dispatch(fetchBrands());
    }, []);



    // const navigate = useNavigate();
    const { brands, isLoading } = useSelector((state: RootState) => state.brand);
    const { user } = useSelector((state: RootState) => state.account);

    return (
        <>
            <SubPage
                title={user.role === ROLES.Admin || user.role === ROLES.Merchant ? 'Brands' : 'Brand'}
                actionTitle={user.role === ROLES.Admin || user.role === ROLES.Merchant ? 'Add' : undefined}
                handleAction={() => dispatch(navigate('/dashboard/brand/add'))}
            >
                {isLoading ? (
                    <LoadingIndicator inline />
                ) : brands.length > 0 ? (
                    <BrandList brands={brands} user={user} />
                ) : (
                    <NotFound message='No brands found.' />
                )}
            </SubPage>
        </>
    )
}

export default List;