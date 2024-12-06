import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../reducer';
import { updateProduct, productChange, deleteProduct, activateProduct } from '../../../containers/Product/actions';
import { Product, ProductActionTypes } from '../../../containers/Product/interface';

import { ROLES } from '../../../constants';
import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';
import { Brand } from '../../../containers/Brand/interface';
import { SelectOptionValueType, SelectOptionType } from '../../Common/SelectOption';
interface EditProductProps {
    product: Product;
    formErrors: any;
    brands: {
        value: number;
        label: string;
    }[];
    productChange: (name: string, value: any) => void;
    updateProduct: () => void;
    deleteProduct: (id: string) => void;
    activateProduct: (id: string, value: boolean) => void;
}

const taxableSelect = [
    { value: 1, label: 'Yes' },
    { value: 0, label: 'No' }
];

const EditProduct: React.FC<EditProductProps> = ({ product, formErrors, brands }) => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, ProductActionTypes>>();
    const { user } = useSelector((state: RootState) => state.account);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(updateProduct());
    };

    const handleProductChange = (name: string, value: any) => {
        dispatch(productChange(name, value));
    };

    const handleDeleteProduct = () => {
        dispatch(deleteProduct(product._id));
    };

    const handleActivateProduct = (value: boolean) => {
        dispatch(activateProduct(product._id, value));
    };

    const handleSelectChange = (name: string) => (selectedOptions: { value: string | number; label: string; }[] | { value: string | number; label: string; }) => {
        const value = Array.isArray(selectedOptions) ? selectedOptions[0].value : selectedOptions.value;
        handleProductChange(name, value);
    };

    const handleSelectChange2 = (selectedOptions: SelectOptionType[] | SelectOptionType) => {
        console.log('selectedOptions', selectedOptions);
        if (Array.isArray(selectedOptions)) {
            handleProductChange('taxable', selectedOptions[0].value);
        }
        else {
            handleProductChange('taxable', selectedOptions.value);
        }
    };
    console.log(product);


    // rest of the component remains the same
    return (
        <div className='edit-product'>
            <div className='d-flex flex-row mx-0 mb-3'>
                <label className='mr-1'>Product link </label>
                <Link to={`/product/${product.slug}`} className='default-link'>
                    {product.slug}
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
                            placeholder={'Product Name'}
                            value={product.name || ''}
                            onInputChange={handleProductChange}
                        />
                    </Col>
                    <Col xs='12'>
                        <Input
                            type={'text'}
                            error={formErrors['sku']}
                            label={'Sku'}
                            name={'sku'}
                            placeholder={'Product Sku'}
                            value={product.sku || ''}
                            onInputChange={handleProductChange}
                        />
                    </Col>
                    <Col xs='12'>
                        <Input
                            type={'text'}
                            error={formErrors['slug']}
                            label={'Slug'}
                            name={'slug'}
                            placeholder={'Product Slug'}
                            value={product.slug || ''}
                            onInputChange={handleProductChange}
                        />
                    </Col>
                    <Col xs='12' md='12'>
                        <Input
                            type={'textarea'}
                            error={formErrors['description']}
                            label={'Description'}
                            name={'description'}
                            placeholder={'Product Description'}
                            value={product.description || ''}
                            onInputChange={handleProductChange}
                        />
                    </Col>
                    <Col xs='12' lg='6'>
                        <Input
                            type={'number'}
                            error={formErrors['quantity']}
                            label={'Quantity'}
                            name={'quantity'}
                            decimals={false}
                            placeholder={'Product Quantity'}
                            value={product.quantity ? product.quantity.toString() : '0'}
                            onInputChange={handleProductChange}
                        />
                    </Col>
                    <Col xs='12' lg='6'>
                        <Input
                            type={'number'}
                            error={formErrors['price']}
                            label={'Price'}
                            name={'price'}
                            min={1}
                            placeholder={'Product Price'}
                            value={product.price ? product.price.toString() : '0'}
                            onInputChange={handleProductChange}
                        />
                    </Col>
                    {/* <Col xs='12' md='12'>
                        <SelectOption
                            error={formErrors['taxable']}
                            label={'Taxable'}
                            multi={false}
                            // name={'taxable'}
                            value={product.taxable ? taxableSelect[0] : taxableSelect[1]}
                            options={taxableSelect}
                            handleSelectChange={handleSelectChange2}
                        />
                    </Col> */}
                    {/* {user.role === ROLES.Admin && (
                        // <Col xs='12' md='12'>
                        //     <SelectOption
                        //         error={formErrors['brand']}
                        //         label={'Select Brand'}
                        //         multi={false}
                        //         value={product.brand}
                        //         options={brands?.map(brand => ({ value: brand.value, label: brand.label })) || []}
                        //         handleSelectChange={handleSelectChange('select brands')}
                        //     />
                        // </Col>
                    )} */}
                    <Col xs='12' md='12' className='mt-3 mb-2'>
                        <Switch
                            id={`enable-product-${product._id}`}
                            // name={'isActive'}
                            label={'Active?'}
                            checked={product?.isActive || false}
                            toggleCheckboxChange={value => {
                                handleProductChange('isActive', value);
                                handleActivateProduct(value);
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
                        onClick={handleDeleteProduct}
                    />
                </div>
            </form>
        </div>
    );
};

export default EditProduct;