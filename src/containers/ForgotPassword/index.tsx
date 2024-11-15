import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, forgotPasswordChange } from './actions';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { ForgotPasswordActionTypes } from "./interface";


const ForgotPassword: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, ForgotPasswordActionTypes>>();
    const authenticated = useSelector((state: RootState) => state.authentication.authenticated);
    const forgotFormData = useSelector((state: RootState) => state.forgotPassword.forgotFormData);
    const formErrors = useSelector((state: RootState) => state.forgotPassword.formErrors);
    const handleForgotPasswordChange = (name: string, value: string) => {
        dispatch(forgotPasswordChange(name, value));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(forgotPassword());
    };

    const navigate = useNavigate();

    if (authenticated) {
        navigate('/dashboard');
    }

    return (
        <div className='forgot-password-form'>
            <h3>Forgot Password</h3>
            <hr />
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col xs='12' md='6'>
                        <Input
                            type='text'
                            error={formErrors['email']}
                            label='Email Address'
                            name='email'
                            placeholder='Please Enter Your Email'
                            value={forgotFormData.email}
                            onInputChange={(name, value) => {
                                if (typeof value === 'string') {
                                    handleForgotPasswordChange(name, value);
                                }
                            }}
                        />
                    </Col>
                </Row>
                <hr />
                <div className='d-flex flex-column flex-md-row align-items-md-center justify-content-between'>
                    <Button
                        type='submit'
                        variant='primary'
                        text='Send Email'
                        className='mb-3 mb-md-0'
                    />
                    <Link className='redirect-link' to='/login'>
                        Back to login
                    </Link>
                </div>
            </form>
        </div>
    );

}

export default ForgotPassword;