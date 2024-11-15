import React, { FC, FormEvent } from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { CategoryActionTypes } from '../../../containers/Category/interface';
import { categoryChange, addCategory } from '../../../containers/Category/actions';
import { Product } from '../../../containers/Product/interface';
import { CategoryFormData } from '../../../containers/Category/interface';
interface AddCategoryProps {
    products: Product[];
    categoryFormData: CategoryFormData;
    formErrors: {
        name?: string;
        description?: string;
        products?: string;
    };
    categoryChange: (name: string, value: string | string[]) => void;
    addCategory: () => void;
}

const AddCategory: FC<AddCategoryProps> = ({
    products,
    categoryFormData,
    formErrors,
    categoryChange,
    addCategory
}) => {

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        addCategory();
    };

    return (
        <div className='add-category'>
            <form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Col xs='12'>
                        <Input
                            type='text'
                            error={formErrors['name']}
                            label='Name'
                            name='name'
                            placeholder='Category Name'
                            value={categoryFormData.name}
                            onInputChange={(name, value) => {
                                if (typeof value === "string") {
                                    categoryChange(name, value);
                                }
                            }}
                        />
                    </Col>
                    <Col xs='12' md='12'>
                        <Input
                            type='textarea'
                            error={formErrors['description']}
                            label='Description'
                            name='description'
                            placeholder='Category Description'
                            value={categoryFormData.description}
                            onInputChange={(name, value) => {
                                if (typeof value === "string") {
                                    categoryChange(name, value);
                                }
                            }}
                        />
                    </Col>
                    <Col xs='12' md='12'>
                        {/* this is stupid idea so i will remove it certain. */}
                        <SelectOption
                            error={formErrors['products']}
                            label='Select Products'
                            multi={true}
                            value={categoryFormData.products ? categoryFormData.products.map(product => ({ value: product._id, label: product.name || "" })) : []}
                            options={products.map(product => ({ value: product._id, label: product.name || "" }))}
                            handleSelectChange={value => {
                                if (typeof value === "string") {
                                    categoryChange("products", value);
                                }
                            }}
                        />
                    </Col>
                    <Col xs='12' md='12' className='my-2'>
                        <Switch
                            id='active-category'
                            className='isActive'
                            label='Active?'
                            checked={categoryFormData.isActive}
                            toggleCheckboxChange={value => {
                                if (typeof value === "string") {
                                    categoryChange("isActive", value);
                                }
                            }}
                        />
                    </Col>
                </Row>
                <hr />
                <div className='add-category-actions'>
                    <Button type='submit' text='Add Category' />
                </div>
            </form>
        </div>
    );
};

export default AddCategory;