import React, { FC, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';
import Switch from '../../Common/Switch';
import { Product } from '../../../containers/Product/interface';
import { Category } from '../../../containers/Category/interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { CategoryActionTypes } from '../../../containers/Category/interface';
import { fetchCategory, categoryEditChange, resetCategory, categoryChange, updateCategory, deleteCategory, activateCategory } from '../../../containers/Category/actions';


const EditCategory: FC = ({
}) => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, CategoryActionTypes>>();
    const category = useSelector((state: RootState) => state.category.category) as Category;
    const formErrors = useSelector((state: RootState) => state.category.formErrors);
    const products = useSelector((state: RootState) => state.product.productsSelect) as Product[];

    const handleCategoryEditChange = (name: string, value: string) => {
        dispatch(categoryEditChange(name, value));
    }

    const handleUpdateCategory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateCategory());
    }

    const handleDeleteCategory = (id: string) => {
        dispatch(deleteCategory(id));
    }

    const handleActivateCategory = (id: string, value: boolean) => {
        dispatch(activateCategory(id, value));
    }

    return (
        <div className='edit-category'>
            <div className='d-flex flex-row mx-0 mb-3'>
                <label className='mr-5'>Category link </label>
                <Link to={`/shop/category/${category.slug}`} className='default-link ml-1'>
                    {category.slug}
                </Link>
            </div>
            <form onSubmit={handleUpdateCategory} noValidate>
                <Row>
                    <Col xs='12'>
                        <Input
                            type={'text'}
                            error={formErrors['name']}
                            label={'Name'}
                            name={'name'}
                            placeholder={'Category Name'}
                            value={category.name}
                            onInputChange={(name, value) => {
                                if (typeof value === "string") {
                                    handleCategoryEditChange(name, value);
                                }
                            }}
                        />
                    </Col>
                    <Col xs='12'>
                        <Input
                            type={'text'}
                            error={formErrors['slug']}
                            label={'Slug'}
                            name={'slug'}
                            placeholder={'Category Slug'}
                            value={category.slug}
                            onInputChange={(name, value) => {
                                if (typeof value === "string") {
                                    handleCategoryEditChange(name, value);
                                }
                            }}
                        />
                    </Col>
                    <Col xs='12' md='12'>
                        <Input
                            type={'textarea'}
                            error={formErrors['description']}
                            label={'Description'}
                            name={'description'}
                            placeholder={'Category Description'}
                            value={category.description}
                            onInputChange={(name, value) => {
                                if (typeof value === "string") {
                                    handleCategoryEditChange(name, value);
                                }
                            }}
                        />
                    </Col>
                    <Col xs='12' md='12'>
                        <SelectOption
                            error={formErrors['products']}
                            label={'Select Products'}
                            multi={true}
                            defaultValue={category.products.map(product => ({ value: product._id, label: product.name ? product.name : "No product" }))}
                            options={products.map(product => ({ value: product._id, label: product.name ? product.name : "No product" }))}
                            handleSelectChange={value => {
                                if (typeof value === "string") {
                                    handleCategoryEditChange('products', value);
                                }
                            }}
                        />
                    </Col>
                    <Col xs='12' md='12' className='mt-3 mb-2'>
                        <Switch
                            style={{ width: 100 }}
                            tooltip={category.isActive}
                            tooltipContent={`Disabling ${category.name} will also disable all ${category.name} products.`}
                            id={`enable-category-${category._id}`}
                            className={'isActive'}
                            label={'Active?'}
                            checked={category.isActive}
                            toggleCheckboxChange={value =>
                                // activateCategory(category._id, value)
                                handleActivateCategory(category._id, value)
                            }
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
                        onClick={() => handleDeleteCategory(category._id)}
                    />
                </div>
            </form>
        </div>
    );
};

export default EditCategory;