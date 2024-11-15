import React from 'react';
import AddAddress from '../../components/Manager/AddAddress';
import SubPage from '../../components/Manager/SubPage';
import { RootState } from '../../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AddressActionTypes } from './interface';
import { navigate } from '../Navigate';
import { addressChange, addAddress } from './actions';

const Add: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, AddressActionTypes>>();
    const addressFormData = useSelector((state: RootState) => state.address.addressFormData);
    const formErrors = useSelector((state: RootState) => state.address.formErrors);
    const goback = () => {
        navigate(-1)
    }

    const handleAddressChange = (name: string, value: any) => {
        dispatch(addressChange(name, value));
    }

    const handleAddAddress = () => {
        dispatch(addAddress());
    }

    return (
        <SubPage
            title='Add Address'
            actionTitle='Cancel'
            handleAction={() => goback()}
        >
            <AddAddress
                addressFormData={addressFormData}
                formErrors={formErrors}
                addressChange={handleAddressChange}
                addAddress={handleAddAddress}
            />
        </SubPage>
    );
}


export default Add;