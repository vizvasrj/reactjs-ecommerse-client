import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import SelectOption from '../../Common/SelectOption';
import Input from '../../Common/Input';
import Button from '../../Common/Button';

interface ReviewFormData {
    title: string;
    review: string;
    rating: number;
    isRecommended: number;
}

interface ReviewFormErrors {
    title?: string;
    review?: string;
    rating?: string;
    isRecommended?: string;
}

interface AddProps {
    reviewFormData: ReviewFormData;
    reviewChange: (name: string, value: string | number) => void;
    reviewFormErrors: ReviewFormErrors;
    addReview: () => void;
}

const recommedableSelect = [
    { value: 1, label: 'Yes' },
    { value: 0, label: 'No' }
];

const Add: React.FC<AddProps> = ({
    reviewFormData,
    reviewChange,
    reviewFormErrors,
    addReview
}) => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addReview();
    };

    return (
        <div className='bg-white p-4 box-shadow-primary add-review'>
            <form onSubmit={handleSubmit} noValidate>
                <h3 className='mb-3'>Add Review</h3>
                <Row>
                    <Col xs='12' md='12'>
                        <Input
                            type={'text'}
                            error={reviewFormErrors['title']}
                            label={'Title'}
                            name={'title'}
                            placeholder={'Enter Review title'}
                            value={reviewFormData.title}
                            onInputChange={(name, value) => {
                                if (typeof value === 'string') {
                                    reviewChange(name, value);
                                }
                            }}
                        />
                    </Col>
                    <Col xs='12' md='12'>
                        <Input
                            type={'textarea'}
                            error={reviewFormErrors['review']}
                            label={'Comment'}
                            name={'review'}
                            placeholder={'Write Review'}
                            value={reviewFormData.review}
                            onInputChange={(name, value) => {
                                if (typeof value === 'string') {
                                    reviewChange(name, value);
                                }
                            }}
                        />
                    </Col>
                    <Col xs='12' md='12'>
                        <Input
                            type={'stars'}
                            error={reviewFormErrors['rating']}
                            label={'Rating'}
                            name={'rating'}
                            value={reviewFormData.rating.toString()}
                            onInputChange={(name, value) => {
                                // if (typeof value === 'string') {
                                reviewChange(name, value.toString());
                                // }
                            }}
                        />
                    </Col>
                    <Col xs='12' md='12'>
                        <SelectOption
                            error={reviewFormErrors['isRecommended']}
                            label={'Will you recommend this product?'}
                            // name={'isRecommended'}
                            value={{ value: reviewFormData.isRecommended, label: reviewFormData.isRecommended.toString() }}
                            options={recommedableSelect}
                            handleSelectChange={value => {
                                if (typeof value === 'string') {
                                    reviewChange('isRecommended', value);
                                }

                            }}
                        />
                    </Col>
                </Row>
                <div className='mt-4'>
                    <Button type='submit' text='Publish Review' />
                </div>
            </form>
        </div>
    );
};

export default Add;