import React from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';

import { brandChange, addBrand } from '../../../containers/Brand/actions';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../reducer';
import { useDispatch } from 'react-redux';
import { BrandActionTypes } from '../../../containers/Brand/actions';

interface AddBrandProps {
    brandFormData: {
        name: string;
        description: string;
        isActive: boolean;
    };
    formErrors: {
        name: string;
        description: string;
    };
}

const AddBrand: React.FC<AddBrandProps> = ({
    brandFormData,
    formErrors,
}) => {

    const dispatch = useDispatch<ThunkDispatch<RootState, null, BrandActionTypes>>();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(addBrand());
    };

    const handleBrandChange = (name: string, value: any) => {
        dispatch(brandChange(name, value));
    }
    return (
        <div className='add-brand'>
            <form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Col xs='12'>
                        <Input
                            type={'text'}
                            error={formErrors['name']}
                            label={'Name'}
                            name={'name'}
                            placeholder={'Brand Name'}
                            value={brandFormData.name}
                            onInputChange={handleBrandChange}
                        />
                    </Col>
                    <Col xs='12' md='12'>
                        <Input
                            type={'textarea'}
                            error={formErrors['description']}
                            label={'Description'}
                            name={'description'}
                            placeholder={'Brand Description'}
                            value={brandFormData.description}
                            onInputChange={handleBrandChange}
                        />
                    </Col>
                    <Col xs='12' md='12' className='my-2'>
                        <Switch
                            id={'active-brand'}
                            className={'isActive'}
                            label={'Active?'}
                            checked={brandFormData.isActive}
                            toggleCheckboxChange={value => handleBrandChange('isActive', value)}
                        />
                    </Col>
                </Row>
                <hr />
                <div className='add-brand-actions'>
                    <Button type='submit' text='Add Brand' />
                </div>
            </form>
        </div>
    );
};

export default AddBrand;