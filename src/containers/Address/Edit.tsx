import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import actions from '../../actions';
import EditAddress from '../../components/Manager/AddressEdit';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { AddressActionTypes, Address } from './interface';
import { navigate, NavigateActionType } from '../Navigate';
import { addressEditChange, updateAddress, deleteAddress, fetchAddress } from './actions';

const Edit: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, AddressActionTypes | NavigateActionType>>();
    const match = useParams<{ id: string }>();
    useEffect(() => {
        const addressId = match?.id;
        if (addressId) {
            dispatch(fetchAddress(addressId));
        }
    }, [match.id, fetchAddress]);

    const goback = () => {
        dispatch(navigate(-1));
    }

    const address = useSelector((state: RootState) => state.address.address) as Address;
    const formErrors = useSelector((state: RootState) => state.address.editFormErrors);

    const handleAddressEditChange = (name: string, value: any) => {
        dispatch(addressEditChange(name, value));
    }

    const handleUpdateAddress = () => {
        dispatch(updateAddress());
    }

    const handleDeleteAddress = (id: string) => {
        dispatch(deleteAddress(id));
    }

    return (
        <SubPage
            title='Edit Address'
            actionTitle='Cancel'
            handleAction={() => goback()}
        >
            {address?._id ? (
                <EditAddress
                    address={address}
                    addressChange={handleAddressEditChange}
                    formErrors={formErrors}
                    updateAddress={handleUpdateAddress}
                    deleteAddress={handleDeleteAddress}
                // defaultChange={defaultChange}
                />
            ) : (
                <NotFound message='No address found.' />
            )}
        </SubPage>
    );
};

export default Edit;