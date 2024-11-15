import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AddressList from '../../components/Manager/AddressList';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';
import { fetchAddresses, setDefaultAddress } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Address, AddressActionTypes } from './interface';
import { navigate, NavigateActionType } from '../Navigate';


const List: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, AddressActionTypes | NavigateActionType>>();
    useEffect(() => {
        dispatch(fetchAddresses());
    }, []);
    const addresses = useSelector((state: RootState) => state.address.addresses) as Address[];

    const handleSetDefaultAddress = (id: string) => {
        dispatch(setDefaultAddress(id));
    }
    return (
        <>
            <SubPage
                title='Addresses'
                actionTitle={'Add'}
                handleAction={() => dispatch(navigate('/dashboard/address/add'))}
            >
                {addresses?.length > 0 ? (
                    <AddressList
                        addresses={addresses}
                        setDefaultAddress={handleSetDefaultAddress}
                    />
                ) : (
                    <NotFound message='No addresses found.' />
                )}
            </SubPage>
        </>
    );
};


export default List;