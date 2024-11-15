import React, { useEffect } from 'react';

import ProductList from '../../components/Store/ProductList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ProductActionTypes } from '../Product/interface';
import { ThunkDispatch } from 'redux-thunk';
import { filterProducts } from '../Product/actions';
import { updateWishlist } from '../WishList/actions';
import { WishlistActionTypes } from '../WishList/interface';


const CategoryShop: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const dispatch = useDispatch<ThunkDispatch<RootState, null, ProductActionTypes | WishlistActionTypes>>();
    const { products, isLoading } = useSelector((state: RootState) => state.product);
    const { authenticated } = useSelector((state: RootState) => state.authentication);

    useEffect(() => {
        dispatch(filterProducts('category', slug));
    }, [slug, dispatch]);

    const handleUpdateWishlist = (productId: string) => {
        dispatch(updateWishlist(true, productId));
    }


    return (
        <div className='category-shop'>
            {isLoading && <LoadingIndicator />}
            {products && products.length > 0 && (
                <ProductList
                    products={products}
                    authenticated={authenticated}
                    updateWishlist={handleUpdateWishlist}
                />
            )}
            {!isLoading && products && products.length <= 0 && (
                <NotFound message='No products found.' />
            )}
        </div>
    );
};

export default CategoryShop;