import React from 'react';
import EditBrand from '../../components/Manager/EditBrand';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../reducer';
import { BrandActionTypes, fetchBrand } from './actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { navigate, NavigateActionType } from '../Navigate';

const Edit: React.FC = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch<ThunkDispatch<RootState, null, BrandActionTypes>>();
    // const navigate = useNavigate();
    const goBack = () => navigate(-1);
    useEffect(() => {
        if (id) {
            dispatch(fetchBrand(id));
        }
    }, [dispatch, id])

    const brand = useSelector((state: RootState) => state.brand.brand);
    const user = useSelector((state: RootState) => state.account.user);
    const formErrors = useSelector((state: RootState) => state.brand.editFormErrors);


    return (
        <SubPage
            title='Edit Brand'
            actionTitle='Cancel'
            handleAction={goBack}
        >
            {brand?._id ? (
                <EditBrand
                    user={user}
                    brand={brand}
                    formErrors={formErrors}
                // brandChange={brandEditChange}
                // updateBrand={updateBrand}
                // deleteBrand={deleteBrand}
                // activateBrand={activateBrand}
                />
            ) : (
                <NotFound message='No brand found.' />
            )}
        </SubPage>
    );
}



export default Edit;