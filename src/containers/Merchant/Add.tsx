import React from 'react';
import SubPage from '../../components/Manager/SubPage';
import AddMerchant from '../../components/Manager/AddMerchant';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { navigate, NavigateActionType } from '../Navigate';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';


const Add: React.FC = () => {
    // const navigate = useNavigate()
    const dispatch = useDispatch<ThunkDispatch<RootState, null, NavigateActionType>>();
    const goBack = () => dispatch(navigate(-1))
    const merchant = useSelector((state: RootState) => state.merchant);
    const { merchantFormData, formErrors, isSubmitting } = merchant;

    return (
        <SubPage
            title='Add Merchant'
            actionTitle='Cancel'
            handleAction={goBack}
        >
            <AddMerchant
                merchantFormData={merchantFormData}
                formErrors={formErrors}
                isSubmitting={isSubmitting}
                submitTitle='Add Merchant'
            />
        </SubPage>
    );

}



export default Add;