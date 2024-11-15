import React from 'react';
import { Link } from 'react-router-dom';
import { AddressIcon, CheckIcon, EditIcon } from '../../Common/Icon';
import { Address } from '../../../containers/Address/interface';
import { setDefaultAddress } from '../../../containers/Address/actions';
// interface Address {
//     _id: string;
//     isDefault: boolean;
//     address: string;
//     city: string;
//     country: string;
//     zipCode: string;
// }

interface AddressListProps {
    addresses: Address[];
    setDefaultAddress?: (id: string) => void;
    defaultAddress?: Address;
}

const AddressList: React.FC<AddressListProps> = ({ addresses, setDefaultAddress, defaultAddress }) => {
    return (
        <div className='a-list'>
            {addresses?.map((address, index) => (

                <div
                    onClick={() => {
                        if (setDefaultAddress) {
                            setDefaultAddress(address._id);
                        }
                    }}
                >

                    <div className='d-flex align-items-center mb-3 address-box'>
                        <div className='mx-3'>
                            <AddressIcon />
                        </div>
                        <div className='flex-1 p-3 p-lg-4'>
                            {address.isDefault ? (
                                <div className='d-flex align-items-center justify-content-between mb-2'>
                                    <h4 className='mb-0 mr-2 one-line-ellipsis'>
                                        Default Delivery Address
                                    </h4>
                                    <CheckIcon className='text-green' />
                                </div>
                            ) : (
                                <h4 className='mb-0'>Delivery Address</h4>
                            )}
                            <p className='mb-2 address-desc'>
                                {`${address?.address} ${address?.city}, ${address?.country}, ${address?.zipCode}`}
                            </p>
                        </div>
                        <div className='mx-3'>
                            <Link
                                to={`/dashboard/address/edit/${address._id}`}
                                key={index}
                                className='d-block'
                            >
                                <EditIcon />
                            </Link>
                        </div>
                    </div>
                </div>
                // </Link>
            ))}
        </div>
    );
};

export default AddressList;