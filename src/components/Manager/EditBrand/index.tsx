import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import Switch from '../../Common/Switch';
import { ROLES } from '../../../constants';
import { brandChange, brandEditChange, updateBrand, deleteBrand, activateBrand } from '../../../containers/Brand/actions';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { BrandActionTypes } from '../../../containers/Brand/actions';

interface EditBrandProps {
    user: any;
    brand: any;
    formErrors: any;
    // brandChange: (name: string, value: any) => void;
    // updateBrand: () => void;
    // deleteBrand: (id: string) => void;
    // activateBrand: (id: string, value: boolean) => void;
}

const EditBrand: React.FC<EditBrandProps> = ({
    user,
    brand,
    formErrors,
    // brandChange,
    // updateBrand,
    // deleteBrand,
    // activateBrand
}) => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, BrandActionTypes>>();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(updateBrand())
    };

    const handleBrandChange = (name: string, value: any) => {
        console.log("NOTHING", name, value)
        dispatch(brandEditChange(name, value));
    };



    return (
        <div className='edit-brand'>

            <div className='d-flex flex-row mx-0 mb-3'>
                <label className='mr-1'>Brand link </label>
                <Link to={`/shop/brand/${brand.slug}`} className='default-link'>
                    {brand.slug}
                </Link>
            </div>
            <form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Col xs='12'>
                        <Input
                            type={'text'}
                            error={formErrors['name']}
                            label={'Name'}
                            name={'name'}
                            placeholder={'Brand Name'}
                            value={brand.name}
                            onInputChange={handleBrandChange}
                        />
                    </Col>
                    <Col xs='12'>
                        <Input
                            type={'text'}
                            error={formErrors['slug']}
                            label={'Slug'}
                            name={'slug'}
                            placeholder={'Brand Slug'}
                            value={brand.slug}
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
                            value={brand.description}
                            onInputChange={handleBrandChange}
                        />
                    </Col>
                    <Col xs='12' md='12' className='mt-3 mb-2'>
                        <Switch
                            style={{ width: 100 }}
                            tooltip={brand.isActive}
                            tooltipContent={`Disabling ${brand.name} will also disable all ${brand.name} products.`}
                            id={`enable-brand-${brand._id}`}
                            className={'isActive'}
                            label={'Active?'}
                            checked={brand.isActive}
                            toggleCheckboxChange={value => dispatch(activateBrand(brand._id, value))}
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
                        disabled={user.role === ROLES.Merchant}
                        onClick={() => dispatch(deleteBrand(brand._id))}
                    />
                </div>
            </form>
        </div>
    );
};

export default EditBrand;