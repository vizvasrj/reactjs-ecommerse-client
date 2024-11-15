import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import Checkbox from '../../Common/Checkbox';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import { Address } from "../../../containers/Address/interface";

interface Props {
    address: Address;
    formErrors: { [key: string]: string };
    addressChange: (name: string, value: string) => void;
    updateAddress: () => void;
    deleteAddress: (id: string) => void;
}

const EditAddress: React.FC<Props> = ({
    address,
    formErrors,
    addressChange,
    updateAddress,
    deleteAddress,
}) => {

    const handleInputChange = (name: string, value: string | number | File) => {
        if (typeof value === "string") {
            addressChange(name, value);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        updateAddress();
    };

    return (
        <div className='edit-address'>
            <form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Col xs='12' md='12'>
                        <Input
                            type='text'
                            error={formErrors['address']}
                            label='Address'
                            name='address'
                            placeholder='Address: Street, House No / Apartment No'
                            value={address.address}
                            onInputChange={handleInputChange}
                        />
                    </Col>
                    <Col xs='12' md='12'>
                        <Input
                            type='text'
                            error={formErrors['city']}
                            label='City'
                            name='city'
                            placeholder='City'
                            value={address.city}
                            onInputChange={handleInputChange}
                        />
                    </Col>
                    <Col xs='12' lg='6'>
                        <Input
                            type='text'
                            error={formErrors['state']}
                            label='State'
                            name='state'
                            placeholder='State'
                            value={address.state}
                            onInputChange={handleInputChange}
                        />
                    </Col>
                    <Col xs='12' lg='6'>
                        <Input
                            type='text'
                            error={formErrors['country']}
                            label='Country'
                            name='country'
                            placeholder='Please Enter Your Country'
                            value={address.country}
                            onInputChange={handleInputChange}
                        />
                    </Col>
                    <Col xs='12' lg='6'>
                        <Input
                            type='text'
                            error={formErrors['zipCode']}
                            label='Zipcode'
                            name='zipCode'
                            placeholder='Please Enter Your Zipcode'
                            value={address.zipCode}
                            onInputChange={handleInputChange}
                        />
                    </Col>
                    <Col xs='12' md='12'>
                        <Checkbox
                            id='default'
                            label='As the Default'
                            name='isDefault'
                            checked={address.isDefault}
                            onChange={(e, name, value) => {
                                if (typeof value === "string") {
                                    addressChange(name, value);
                                }
                            }}
                        />
                    </Col>
                </Row>
                <hr />
                <div className='d-flex flex-column flex-md-row'>
                    <Button
                        type='submit'
                        text='Save'
                        className='mb-3 mb-md-0 mr-0 mr-md-3'
                    />
                    <Button
                        variant='danger'
                        text='Delete'
                        onClick={() => deleteAddress(address._id)}
                    />
                </div>
            </form>
        </div>
    );
};

export default EditAddress;