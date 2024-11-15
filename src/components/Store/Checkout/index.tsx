import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import { fetchAddresses } from '../../../containers/Address/actions';
import Button from '../../Common/Button';
// import AddressForm from '../OrderAddress';
// import { useHistory } from 'react-router-dom';
import { handleShopping, handleCheckout } from '../../../containers/Cart/actions';
import { fetchAddresses } from '../../../containers/Address/actions';
import { navigate, NavigateActionType } from '../../../containers/Navigate';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Address, AddressActionTypes } from '../../../containers/Address/interface';

interface CheckoutProps {
    authenticated: boolean;
    handleShopping: () => void;
    handleCheckout: () => void;
    placeOrder: () => void;
    // fetchAddresses: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({
    authenticated,
    handleShopping,
    handleCheckout,
    placeOrder,
    // fetchAddresses,
}) => {
    // const dispatch = useDispatch<ThunkDispatch<RootState, null, AddressActionTypes | NavigateActionType>>();
    // const addresses = useSelector((state: RootState) => state.address.addresses) as Address[];
    // const authenticated = useSelector((state: RootState) => state.authentication.authenticated);
    // const handleHndleShopping = () => {
    //     dispatch(handleShopping());
    // };

    // const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    // const history = useHistory();




    // useEffect(() => {
    //     dispatch(fetchAddresses());
    // }, [fetchAddresses]);

    // const handlePlaceOrder = () => {
    //     // history.push('/cart/address');
    //     dispatch(navigate('/cart/address'));
    //     // if (selectedAddress) {
    //     //     placeOrder(selectedAddress);
    //     // } else {
    //     //     alert('Please select an address before placing your order');
    //     // }
    // };

    // const handleCheckout = () => {
    //     // history.push('/cart/address');
    //     dispatch(navigate('/cart/address'));
    // }

    // const handleHandleCheckout = () => {
    //     dispatch(handleCheckout());
    // }

    return (
        <div className='easy-checkout'>
            <div className='checkout-actions'>
                <Button
                    variant='primary'
                    text='Continue shopping'
                    onClick={() => handleShopping()}
                />
                {authenticated ? (
                    <Button
                        variant='primary'
                        text='Place Order'
                        onClick={placeOrder}
                    />
                ) : (
                    <Button
                        variant='primary'
                        text='Proceed To Checkout'
                        onClick={() => handleCheckout()}
                    />
                )}
            </div>
        </div>
    );
};


export default Checkout;