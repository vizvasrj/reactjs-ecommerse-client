import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
// import actions from '../../actions';
import { resetProduct, fetchProduct } from './actions';
import { BrandActionTypes, fetchBrandsSelect } from '../Brand/actions';

import EditProduct from '../../components/Manager/EditProduct';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

import { RootState } from '../../reducer';
import { ProductActionTypes } from './interface';
import { productEditChange, updateProduct, deleteProduct, activateProduct } from './actions';
import { navigate, NavigateActionType } from '../Navigate';
const Edit: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, NavigateActionType | ProductActionTypes | BrandActionTypes>>();
    // const navigate = useNavigate();
    const goBack = () => dispatch(navigate(-1));
    const { id: productId } = useParams<{ id: string }>();

    const user = useSelector((state: RootState) => state.account.user);
    const product = useSelector((state: RootState) => state.product.product);
    const formErrors = useSelector((state: RootState) => state.product.editFormErrors);
    const brands = useSelector((state: RootState) => state.brand.brandsSelect);

    useEffect(() => {
        dispatch(resetProduct());
        if (productId) {
            dispatch(fetchProduct(productId));
        } else {

        }
        dispatch(fetchBrandsSelect());
    }, [dispatch, productId]);

    const handleProductEditChange = (name: string, value: any) => {
        dispatch(productEditChange(name, value));
    }

    const handleUpdateProduct = () => {
        dispatch(updateProduct());
    }

    const handleDeleteProduct = () => {
        dispatch(deleteProduct(product._id));
    }

    const handleActivateProduct = (id: string, value: boolean) => {
        dispatch(activateProduct(product._id, value));
    }

    return (
        <SubPage
            title='Edit Product'
            actionTitle='Cancel'
            handleAction={goBack}
        >
            {product?._id ? (
                <EditProduct
                    // user={user}
                    product={product}
                    formErrors={formErrors}
                    brands={brands}
                    productChange={handleProductEditChange}
                    updateProduct={handleUpdateProduct}
                    deleteProduct={handleDeleteProduct}
                    activateProduct={handleActivateProduct}

                />
            ) : (
                <NotFound message='No product found.' />
            )}
        </SubPage>
    );
};

export default Edit;