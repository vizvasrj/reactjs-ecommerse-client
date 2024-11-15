import React from 'react';
import { Route } from 'react-router-dom';
import ProductList from '../../components/Manager/ProductList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import { fetchProducts } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { ProductActionTypes } from './interface';
// import { useNavigate } from 'react-router';
import { navigate, NavigateActionType } from '../Navigate';
const List: React.FC = () => {
    // const navigate = useNavigate();
    const { products, isLoading } = useSelector((state: RootState) => state.product);
    const dispatch = useDispatch<ThunkDispatch<RootState, null, ProductActionTypes | NavigateActionType>>();

    React.useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const handleAction = () => {
        dispatch(navigate('/dashboard/product/add'));
    }

    return (
        <>
            <SubPage
                title='Products'
                actionTitle='Add'
                handleAction={handleAction}
            >
                {isLoading ? (
                    <LoadingIndicator inline />
                ) : products && products.length > 0 ? (
                    <ProductList products={products} />
                ) : (
                    <NotFound message='No products found.' />
                )}
            </SubPage>
        </>
    )
}

export default List;