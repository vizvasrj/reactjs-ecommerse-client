import React from "react";
import { Row, Col } from "reactstrap";
import { redirect, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducer";
import { ThunkDispatch } from "redux-thunk";

import Input from "../../components/Common/NewInput";
import Button from "../../components/Common/Button";
import Checkbox from "../../components/Common/Checkbox";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import SignupProvider from "../../components/Common/SignupProvider";
import { GetState } from "@reduxjs/toolkit";
import { signupChange, signUp, subscribeChange } from "./action";
import { useForm } from "react-hook-form";
import { SignupActionTypes } from "./action";
import { selectSignupAndAuthentication } from "../../selectors/authselector";

type IFormInput = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
};

const Signup: React.FC = () => {
    const navigate = useNavigate();
    // const state = useSelector((state: RootState) => state);
    // const { signup, authentication } = useSelector((state: RootState) => ({
    //     signup: state.signup,
    //     authentication: state.authentication
    // }));
    const { signup, authentication } = useSelector(selectSignupAndAuthentication);
    const dispatch = useDispatch<ThunkDispatch<RootState, null, SignupActionTypes>>();
    const { isLoading, isSubmitting, isSubscribed, signupFormData } = signup;

    React.useEffect(() => {
        if (authentication.authenticated) {
            navigate("/dashboard");
        }
    }, [authentication.authenticated, navigate]);

    const handleSubmitFn = (data: IFormInput) => {
        // e.preventDefault();
        dispatch(signUp());
    };

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();


    return (
        <div className='signup-form'>
            {isLoading && <LoadingIndicator />}
            <h2>Sign Up</h2>
            <hr />
            <form onSubmit={handleSubmit(handleSubmitFn)} noValidate>
                <Row>
                    <Col
                        xs={{ size: 12, order: 2 }}
                        md={{ size: '6', order: 1 }}
                        className='p-0'
                    >
                        <Col xs='12' md='12'>
                            <Input
                                fieldType='input'
                                type='text'
                                errorMessage={(errors.firstName && "This field is required") || ""}
                                label='First Name'
                                name='firstName'
                                placeholder='First Name'
                                required={true}
                                register={register}
                                onInputChange={(name, value) => dispatch(signupChange({ ...signupFormData, [name]: value }))}
                            />
                        </Col>
                        <Col xs='12' md='12'>
                            <Input
                                fieldType='input'
                                type='text'
                                errorMessage={(errors.lastName && "This field is required") || ""}
                                label='Last Name'
                                name='lastName'
                                placeholder='Last Name'
                                required={true}
                                register={register}
                                onInputChange={(name, value) => dispatch(signupChange({ ...signupFormData, [name]: value }))}
                            />
                        </Col>
                        <Col xs='12' md='12'>
                            <Input
                                fieldType='input'
                                type='text'
                                errorMessage={(errors.email && "This field is required") || ""}
                                label='Email'
                                name='email'
                                placeholder='Email'
                                required={true}
                                register={register}
                                onInputChange={(name, value) => dispatch(signupChange({ ...signupFormData, [name]: value }))}
                            />
                        </Col>
                        <Col xs='12' md='12'>
                            <Input
                                fieldType='input'
                                type='password'
                                errorMessage={(errors.password && "This field is required") || ""}
                                label='Password'
                                name='password'
                                placeholder='Password'
                                required={true}
                                register={register}
                                onInputChange={(name, value) => dispatch(signupChange({ ...signupFormData, [name]: value }))}
                            />
                        </Col>

                    </Col>
                    <Col
                        xs={{ size: 12, order: 1 }}
                        md={{ size: '6', order: 2 }}
                        className='mb-2 mb-md-0'
                    >
                        <SignupProvider />
                    </Col>
                </Row>
                <hr />
                <Checkbox
                    id={'subscribe'}
                    label={'Subscribe to newsletter'}
                    checked={isSubscribed}
                    onChange={subscribeChange}
                />
                <div className='d-flex flex-column flex-md-row align-items-md-center justify-content-between'>
                    <Button
                        type='submit'
                        variant='primary'
                        text='Sign Up'
                        disabled={isSubmitting}
                    />
                    <Link className='mt-3 mt-md-0 redirect-link' to={'/login'}>
                        Back to login
                    </Link>
                </div>
            </form>
        </div>
    )

}

export default Signup;