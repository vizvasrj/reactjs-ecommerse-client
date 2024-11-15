import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import Checkbox from '../../Common/Checkbox';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import { FormErrors } from "../../../containers/Address/reducer";
import { AddressFormData } from "../../../containers/Address/interface";

interface AddAddressProps {
    addressFormData: AddressFormData;
    formErrors: FormErrors;
    addressChange: (name: string, value: string) => void;
    addAddress: () => void;
}

const AddAddress: React.FC<AddAddressProps> = ({
    addressFormData,
    formErrors,
    addressChange,
    addAddress,
}) => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addAddress();
    };

    return (
        <div className='add-address'>
            <form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Col xs='12' md='12'>
                        <Input
                            type='text'
                            error={formErrors['address']}
                            label='Address'
                            name='address'
                            placeholder='Address: Street, House No / Apartment No'
                            value={addressFormData.address}
                            onInputChange={(name, value) => {
                                if (typeof value === "string") {
                                    addressChange(name, value);
                                }
                            }}
                        />
                    </Col>
                    <Col xs='12' md='12'>
                        <Input
                            type='text'
                            error={formErrors['city']}
                            label='City'
                            name='city'
                            placeholder='City'
                            value={addressFormData.city}
                            onInputChange={(name, value) => {
                                if (typeof value === "string") {
                                    addressChange(name, value);
                                }
                            }}
                        />
                    </Col>
                    <Col xs='12' lg='6'>
                        <Input
                            type='text'
                            error={formErrors['state']}
                            label='State'
                            name='state'
                            placeholder='State'
                            value={addressFormData.state}
                            onInputChange={(name, value) => {
                                if (typeof value === "string") {
                                    addressChange(name, value);
                                }
                            }}
                        />
                    </Col>
                    <Col xs='12' lg='6'>
                        <Input
                            type='text'
                            error={formErrors['country']}
                            label='Country'
                            name='country'
                            placeholder='Please Enter Your country'
                            value={addressFormData.country}
                            onInputChange={(name, value) => {
                                if (typeof value === "string") {
                                    addressChange(name, value);
                                }
                            }}
                        />
                    </Col>
                    <Col xs='12' lg='6'>
                        <Input
                            type='text'
                            error={formErrors['zipCode']}
                            label='Zipcode'
                            name='zipCode'
                            placeholder='Please Enter Your Zipcode'
                            value={addressFormData.zipCode}
                            onInputChange={(name, value) => {
                                if (typeof value === "string") {
                                    addressChange(name, value);
                                }
                            }}
                        />
                    </Col>
                    <Col xs='12' md='12'>
                        <Checkbox
                            id='default'
                            label='As the Default'
                            name='isDefault'
                            checked={addressFormData.isDefault}
                            onChange={(e, name, value) => {
                                if (typeof value === "string") {
                                    addressChange(name, value);
                                }
                            }}
                        />
                    </Col>
                </Row>
                <hr />
                <div className='add-address-actions'>
                    <Button type='submit' text='Add Address' />
                </div>
            </form>
        </div>
    );
};

export default AddAddress;