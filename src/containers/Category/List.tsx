import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
// import actions from '../../actions';
import CategoryList from '../../components/Manager/CategoryList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { CategoryActionTypes } from '../../containers/Category/interface';
import { fetchCategories } from '../../containers/Category/actions';
// import { Category } from '../../containers/Category/interface';
import { navigate, NavigateActionType } from '../Navigate';

// interface ListProps {
//     history: any;
//     categories: any[];
//     isLoading: boolean;
//     fetchCategories: () => void;
// }

const List: React.FC = ({
    // history,
    // categories,
    // isLoading,
    // fetchCategories,
}) => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, CategoryActionTypes | NavigateActionType>>();
    const { categories, isLoading } = useSelector((state: RootState) => state.category);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [fetchCategories]);

    return (
        <>
            <SubPage
                title='Categories'
                actionTitle='Add'
                handleAction={() =>
                    // history.push('/dashboard/category/add')
                    dispatch(navigate('/dashboard/category/add'))
                }
            >
                {isLoading ? (
                    <LoadingIndicator inline />
                ) : categories.length > 0 ? (
                    <CategoryList categories={categories} />
                ) : (
                    <NotFound message='No categories found.' />
                )}
            </SubPage>
        </>
    );
};

// const mapStateToProps = (state: any) => {
//     return {
//         categories: state.category.categories,
//         isLoading: state.category.isLoading,
//         user: state.account.user,
//     };
// };

export default List;