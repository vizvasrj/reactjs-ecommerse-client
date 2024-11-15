import React, { useEffect } from 'react';
import EditCategory from '../../components/Manager/EditCategory';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { CategoryActionTypes } from '../../containers/Category/interface';
import { fetchCategory, resetCategory, } from '../../containers/Category/actions';
import { fetchProductsSelect } from '../../containers/Product/actions';
import { navigate, NavigateActionType } from '../Navigate';
import { useParams } from 'react-router';


const Edit: React.FC = ({ }) => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, CategoryActionTypes | NavigateActionType>>();
    const { category } = useSelector((state: RootState) => state.category);
    // const products = useSelector((state: RootState) => state.product.productsSelect);
    const match = useParams<{ id: string }>();
    const prevMatchId = React.useRef<string | undefined>();

    useEffect(() => {
        dispatch(resetCategory());
        const categoryId = match.id;
        if (categoryId) {
            dispatch(fetchCategory(categoryId));
            dispatch(fetchProductsSelect());
        }
    }, [match.id]);

    useEffect(() => {
        const categoryId = match?.id;

        const fetchData = async () => {
            if (categoryId) {
                dispatch(resetCategory());
                await dispatch(fetchCategory(categoryId));
                dispatch(fetchProductsSelect());
            }
        };

        fetchData(); // Call immediately on mount

        return () => {  // Cleanup on unmount (optional, but good practice)
            dispatch(resetCategory());
        }

    }, [dispatch, match?.id]); // Dependency array includes dispatch and match.id

    useEffect(() => {
        if (prevMatchId.current !== match?.id) {
            const categoryId = match?.id;

            if (categoryId) {
                dispatch(resetCategory());
                dispatch(fetchCategory(categoryId));
                // Note: fetchProductsSelect is already called in the first useEffect, so no need to call it here again.  Consider if this is the intended behavior.  If you need to refetch products when the category ID changes, uncomment the line below.
                // dispatch(fetchProductsSelect()); 
            }

            prevMatchId.current = match?.id; // Update the ref after fetching
        }


    }, [dispatch, match?.id]);

    const handleGoBack = () => {
        dispatch(navigate("/dashboard/category"));
    }

    // const handleCategoryEditChange = (name: string, value: string) => {
    //     dispatch(categoryChange(name, value));
    // }

    // const handleUpdateCategory = () => {
    //     dispatch(updateCategory());
    // }

    // const handleDeleteCategory = (id: string) => {
    //     dispatch(deleteCategory(id));
    // }

    // const handleActivateCategory = (id: string, value: boolean) => {
    //     dispatch(activateCategory(id, value));
    // }

    return (
        <SubPage
            title='Edit Category'
            actionTitle='Cancel'
            handleAction={handleGoBack}
        >
            {category?._id ? (
                <EditCategory
                // products={products}
                // category={category}
                // formErrors={formErrors}
                // categoryChange={handleCategoryEditChange}
                // updateCategory={handleUpdateCategory}
                // deleteCategory={handleDeleteCategory}
                // activateCategory={handleActivateCategory}
                />
            ) : (
                <NotFound message='No category found.' />
            )}
        </SubPage>
    );
};

export default Edit;