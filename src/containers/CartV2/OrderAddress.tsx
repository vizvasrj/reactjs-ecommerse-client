import React, { useEffect } from 'react';
import AddressList from '../../components/Manager/AddressList';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';
import { fetchAddresses, setDefaultAddress } from '../Address/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Address, AddressActionTypes } from '../Address/interface';
import { navigate, NavigateActionType } from '../Navigate';

const OrderAddress: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, AddressActionTypes | NavigateActionType>>();
    useEffect(() => {
        dispatch(fetchAddresses());
    }, []);

    const addresses = useSelector((state: RootState) => state.address.addresses) as Address[];
    const defaultAddress = useSelector((state: RootState) => state.address.defaultAddress) as Address;
    const handleSetDefaultAddress = (id: string) => {
        dispatch(setDefaultAddress(id));
    }

    return (
        <>
            <SubPage
                title="Addresses"
                actionTitle='Add'
                handleAction={() => dispatch(navigate('/cart/address/add'))}
            >
                {addresses.length > 0 ? (
                    <AddressList
                        addresses={addresses}
                        setDefaultAddress={handleSetDefaultAddress}
                        defaultAddress={defaultAddress}
                    />
                ) : (
                    <NotFound message='No addresses found.' />
                )}
            </SubPage>
        </>
    )
}

export default OrderAddress;