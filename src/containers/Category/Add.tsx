import React, { useEffect } from 'react';
import AddCategory from '../../components/Manager/AddCategory';
import SubPage from '../../components/Manager/SubPage';
import { fetchProductsSelect } from '../../containers/Product/actions';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { CategoryActionTypes } from '../../containers/Category/interface';
import { Product } from '../../containers/Product/interface';
import { categoryChange, addCategory } from '../../containers/Category/actions';
import { navigate, NavigateActionType } from '../Navigate';

const Add: React.FC = ({ }) => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, CategoryActionTypes | NavigateActionType>>();
    const { categoryFormData, formErrors } = useSelector((state: RootState) => state.category);
    const products = useSelector((state: RootState) => state.product.productsSelect);

    useEffect(() => {
        dispatch(fetchProductsSelect());
    }, [fetchProductsSelect]);

    const handleCategoryChange = (name: string, value: string | string[]) => {
        dispatch(categoryChange(name, value));
    }

    const handleAddCategory = () => {
        dispatch(addCategory());
    }

    return (
        <SubPage
            title='Add Category'
            actionTitle='Cancel'
            handleAction={() => dispatch(navigate(-1))}
        >
            <AddCategory
                products={products as Product[]}
                categoryFormData={categoryFormData}
                formErrors={formErrors}
                categoryChange={handleCategoryChange}
                addCategory={handleAddCategory}
            />
        </SubPage>
    );
};


export default Add;