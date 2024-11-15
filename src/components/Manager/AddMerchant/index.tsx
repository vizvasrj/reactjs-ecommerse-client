import React from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import { MerchantFormData } from '../../../containers/Merchant/interface';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../reducer';
import { useDispatch } from 'react-redux';
import { MerchantActionTypes } from '../../../containers/Merchant/interface';
import { addMerchant, merchantChange } from '../../../containers/Merchant/actions';

interface FormErrors {
    name?: string;
    email?: string;
    phoneNumber?: string;
    brandName?: string;
    business?: string;
}

interface AddMerchantProps {
    merchantFormData: MerchantFormData;
    formErrors: FormErrors;
    isSubmitting: boolean;
    submitTitle?: string;
}

const AddMerchant: React.FC<AddMerchantProps> = ({
    merchantFormData,
    formErrors,
    isSubmitting,
    submitTitle = 'Submit',
}) => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, MerchantActionTypes>>();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(addMerchant());
        // todo may me true will be there.
        // dispatch(addMerchant(true));
    };
    const handleMerchantChange = (name: string, value: any) => {
        dispatch(merchantChange(name, value));
    }
    return (
        <div className='add-merchant'>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col xs='12'>
                        <Input
                            type={'text'}
                            error={formErrors['name']}
                            label={'Name'}
                            name={'name'}
                            placeholder={'Your Full Name'}
                            value={merchantFormData.name}
                            onInputChange={handleMerchantChange}
                        />
                    </Col>
                    <Col xs='12'>
                        <Input
                            type={'text'}
                            error={formErrors['email']}
                            label={'Email Address'}
                            name={'email'}
                            placeholder={'Your Email Address'}
                            value={merchantFormData.email}
                            onInputChange={handleMerchantChange}
                        />
                    </Col>
                    <Col xs='12'>
                        <Input
                            type={'text'}
                            error={formErrors['phoneNumber']}
                            label={'Phone Number'}
                            name={'phoneNumber'}
                            placeholder={'Your Phone Number'}
                            value={merchantFormData.phoneNumber}
                            onInputChange={handleMerchantChange}
                        />
                    </Col>
                    <Col xs='12'>
                        <Input
                            type={'text'}
                            error={formErrors['brandName']}
                            label={'Brand'}
                            name={'brandName'}
                            placeholder={'Your Business Brand'}
                            value={merchantFormData.brandName}
                            onInputChange={handleMerchantChange}
                        />
                    </Col>
                    <Col xs='12'>
                        <Input
                            type={'textarea'}
                            error={formErrors['business']}
                            label={'Business'}
                            name={'business'}
                            placeholder={'Please Describe Your Business'}
                            value={merchantFormData.business}
                            onInputChange={handleMerchantChange}
                        />
                    </Col>
                </Row>
                <hr />
                <div className='add-merchant-actions'>
                    <Button type='submit' text={submitTitle} disabled={isSubmitting} />
                </div>
            </form>
        </div>
    );
};

export default AddMerchant;