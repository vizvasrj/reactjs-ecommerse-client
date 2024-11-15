import React, { useEffect } from 'react';

import ProductList from '../../components/Store/ProductList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { useParams } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../reducer';
import { ProductActionTypes } from '../Product/interface';

import { filterProducts } from '../Product/actions';

import { useDispatch, useSelector } from 'react-redux';
import { WishlistActionTypes } from '../WishList/interface';
import { updateWishlist } from '../WishList/actions';


type MatchParams = {
    slug: string;
};

const BrandsShop: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, ProductActionTypes | WishlistActionTypes>>();
    const { slug } = useParams<MatchParams>();
    const { products, isLoading } = useSelector((state: RootState) => state.product);
    const { authenticated } = useSelector((state: RootState) => state.authentication);
    useEffect(() => {
        dispatch(filterProducts('brand', slug));
    }, [slug, dispatch]);

    const handleUpdateWishlist = (productId: string) => {
        dispatch(updateWishlist(true, productId));
    }

    return (
        <div className='brands-shop'>
            {isLoading ? (
                <LoadingIndicator />
            ) : products.length > 0 ? (
                <ProductList
                    products={products}
                    authenticated={authenticated}
                    updateWishlist={handleUpdateWishlist}
                />
            ) : (
                <NotFound message='No products found.' />
            )}
        </div>
    );
};


export default BrandsShop;