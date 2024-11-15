import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';


import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { MerchantActionTypes } from '../Merchant/interface';
import { merchantSignupChange, merchantSignUp } from '../Merchant/actions';
import { useLocation, useParams } from 'react-router';


const MerchantSignup: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch<ThunkDispatch<RootState, null, MerchantActionTypes>>();
    const signupFormData = useSelector((state: RootState) => state.merchant.signupFormData);
    const formErrors = useSelector((state: RootState) => state.merchant.signupFormErrors);
    const handleMerchantSignupChange = (name: string, value: any) => {
        dispatch(merchantSignupChange(name, value));
    }

    useEffect(() => {
        const email = location.search.split('=')[1];
        dispatch(merchantSignupChange('email', email));
    }, [location.search, merchantSignupChange]);

    const param = useParams<{ token: string }>();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const token = param.token;
        if (token) {
            dispatch(merchantSignUp(token));
        }
    };

    return (
        <div className='merchant-signup-form'>
            <form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Col xs={{ size: 12 }} md={{ size: 6, offset: 3 }} className='p-0'>
                        <Col xs='12' md='12'>
                            <h2 className='text-center'>Complete Sign Up</h2>
                            <hr />
                        </Col>

                        <Col xs='12' md='12'>
                            <Input
                                type='text'
                                error={formErrors.email}
                                label='Email Address'
                                name='email'
                                placeholder='Please Enter Your Email'
                                value={signupFormData.email}
                                onInputChange={(name, value) => {
                                    handleMerchantSignupChange(name, value);
                                }}
                            />
                        </Col>
                        <Col xs='12' md='12'>
                            <Input
                                type='text'
                                error={formErrors.firstName}
                                label='First Name'
                                name='firstName'
                                placeholder='Please Enter Your First Name'
                                value={signupFormData.firstName}
                                onInputChange={(name, value) => {
                                    handleMerchantSignupChange(name, value);
                                }}
                            />
                        </Col>
                        <Col xs='12' md='12'>
                            <Input
                                type='text'
                                error={formErrors.lastName}
                                label='Last Name'
                                name='lastName'
                                placeholder='Please Enter Your Last Name'
                                value={signupFormData.lastName}
                                onInputChange={(name, value) => {
                                    handleMerchantSignupChange(name, value);
                                }}
                            />
                        </Col>
                        <Col xs='12' md='12'>
                            <Input
                                type='password'
                                label='Password'
                                error={formErrors.password}
                                name='password'
                                placeholder='Please Enter Your Password'
                                value={signupFormData.password}
                                onInputChange={(name, value) => {
                                    handleMerchantSignupChange(name, value);
                                }}
                            />
                        </Col>
                        <Col xs='12' md='12'>
                            <Button
                                className='mt-3'
                                type='submit'
                                variant='primary'
                                text='Get Started'
                            />
                        </Col>
                    </Col>
                </Row>
            </form>
        </div>
    );
};


export default MerchantSignup;