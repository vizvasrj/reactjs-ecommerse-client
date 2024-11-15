import React, { Component } from 'react';
import { fetchAddresses } from './actions';
import Button from '../../components/Common/Button';
import { setSelectedAddress } from '../Order/actions';
import { Address } from '../Address/interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { AddressActionTypes } from './interface';
import { navigate, NavigateActionType } from '../Navigate';
import requireAuth from '../Authentication';

// import { bindActionCreators } from 'redux';
// import * as actions from './actions';
// interface Address {
//     _id: string;
//     address: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     country: string;
// }

// interface OrderAddressFormProps {
//     // fetchAddresses: () => void;
//     // addresses: Address[];
//     onAddressSelect?: (address: Address) => void;
// }

// interface OrderAddressFormState {
//     selectedAddress: Address | null;
// }


const OrderAddressForm: React.FC = () => {
    // constructor(props: OrderAddressFormProps) {
    //     super(props);
    //     this.state = {
    //         selectedAddress: null
    //     };
    // }

    // componentDidMount() {
    //     this.props.fetchAddresses();
    // }
    const dispatch = useDispatch<ThunkDispatch<RootState, null, AddressActionTypes | NavigateActionType>>();
    React.useEffect(() => {
        dispatch(fetchAddresses());
    }, [fetchAddresses]);

    const handleAddressSelect = (address: Address) => {
        console.log("What is this");
        dispatch(setSelectedAddress(address));
        // Pass the selected address to your order placement logic
    }

    const handleNext = () => {
        // Handle the "Next" button click here
        // console.log('Next button clicked');
        // this.props.history.push('/cart/payment');
        // this.props.placeOrder();
        dispatch(navigate('/cart/payment'));
    }

    // const { addresses } = this.props;
    // const { selectedAddress } = this.state;
    const { addresses } = useSelector((state: RootState): { addresses: Address[] } => state.address);
    const { selectedAddress } = useSelector((state: RootState): { selectedAddress: Address } => state.order);

    return (
        <div className="address-form">
            <h2>Select a Shipping Address</h2>
            {addresses && addresses.length > 0 ? (
                <div>
                    {addresses.map((address: Address) => (
                        <div key={address._id}
                            style={{ marginBottom: '10px', display: 'flex', verticalAlign: 'top', borderBottom: '1px solid #ccc' }}
                        >
                            <input
                                type="radio"
                                checked={selectedAddress ? selectedAddress._id === address._id : false}
                                onChange={() => handleAddressSelect(address)}
                                style={{ padding: '10px' }}
                            />
                            <div
                                className={selectedAddress && selectedAddress._id === address._id ? 'selected' : ''}
                                onClick={() => handleAddressSelect(address)}
                                style={{ cursor: 'pointer', marginLeft: '10px' }}
                            >
                                <p>{address.address}</p>
                                <p>{address.city}, {address.state}, {address.zipCode}, {address.country}</p>
                            </div>
                        </div>
                    ))}
                    <Button variant='primary' onClick={handleNext}
                        text="Next Payment"
                    />
                </div>
            ) : (
                <p>No addresses found. Please add an address.</p>
            )}
        </div>
    );
}

// OrderAddressForm.propTypes = {
//     fetchAddresses: PropTypes.func.isRequired,
//     addresses: PropTypes.array.isRequired,
//     onAddressSelect: PropTypes.func
// };

// OrderAddressForm.defaultProps = {
//     onAddressSelect: () => { }
// };

// const mapStateToProps = state => ({
//     addresses: state.address.addresses,
//     selectedAddress: state.order.selectedAddress
// });

export default requireAuth(OrderAddressForm);