import React from 'react';
import { connect } from 'react-redux';
// import actions from '../../actions';
import AddBrand from '../../components/Manager/AddBrand';
import SubPage from '../../components/Manager/SubPage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer';

// interface Props {
//     history: any;
//     brandFormData: any;
//     formErrors: any;
// }

const Add: React.FC = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const { brandFormData, formErrors } = useSelector((state: RootState) => state.brand);
    const brandFormErrors = {
        name: typeof formErrors.name === 'string' ? formErrors.name : '',
        description: typeof formErrors.description === 'string' ? formErrors.description : ''
    };
    return (
        <SubPage
            title='Add Brand'
            actionTitle='Cancel'
            handleAction={() => goBack()}
        >
            <AddBrand
                brandFormData={brandFormData}
                formErrors={brandFormErrors}
            />
        </SubPage >
    );
}


export default Add;