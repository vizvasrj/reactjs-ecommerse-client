import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import actions from '../../actions';
import ProductList from '../../components/Store/ProductList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { fetchProducts, filterProducts } from '../Product/actions';
import { updateWishlist } from '../WishList/actions';
import { ThunkDispatch } from 'redux-thunk';
import { Product } from '../Product/interface';
import { ProductActionTypes } from '../Product/interface';
import { WishlistActionTypes } from '../WishList/interface';
import { useParams } from 'react-router-dom';


type MatchParams = {
    slug: string;
};

const ProductsShop: React.FC = ({ }) => {
    const { slug } = useParams<MatchParams>();

    const dispatch = useDispatch<ThunkDispatch<RootState, null, ProductActionTypes | WishlistActionTypes>>();
    const { storeProducts, isLoading, products } = useSelector((state: RootState) => state.product);

    const { authenticated } = useSelector((state: RootState) => state.authentication);


    useEffect(() => {
        // const slug = slug;
        // console.log("Helrere", slug);
        // if (slug) {
        dispatch(filterProducts("slug"));
        // }
    }, [slug, filterProducts]);

    const displayProducts = storeProducts && storeProducts.length > 0;
    const handleUpdateWishlist = (id: string, value: boolean) => {
        dispatch(updateWishlist(value, id));
    }


    return (
        <div className='products-shop'>
            {isLoading && <LoadingIndicator />}
            {displayProducts && (
                <ProductList
                    products={storeProducts}
                    authenticated={authenticated}
                    updateWishlist={handleUpdateWishlist}
                />
            )}
            {!isLoading && !displayProducts && (
                <NotFound message='No products found.' />
            )}
        </div>
    );
};


export default ProductsShop;