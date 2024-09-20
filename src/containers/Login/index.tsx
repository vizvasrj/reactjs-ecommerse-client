import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import { redirect, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducer";
import { ThunkDispatch } from "redux-thunk";

import Input from "../../components/Common/NewInput";
import Button from "../../components/Common/Button";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import SignupProvider from "../../components/Common/SignupProvider";
import { login, loginChange } from "./actions";
import { useForm } from "react-hook-form";
import { LoginActionTypes } from "./actions";
import { selectSignupAndAuthentication } from "../../selectors/authselector";

type IFormInput = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const navigate = useNavigate();
    // const { login, authentication } = useSelector((state: RootState) => ({
    //     login: state.login,
    //     authentication: state.authentication
    // }));
    const registerLink = () => {
        navigate("/register")
    }
    const { login: loginState, authentication } = useSelector(selectSignupAndAuthentication);

    const dispatch = useDispatch<ThunkDispatch<RootState, null, LoginActionTypes>>();
    const { isLoading, isSubmitting, loginFormData } = loginState;

    // if (authentication.authenticated) {
    //     navigate("/dashboard");
    // }
    useEffect(() => {
        if (authentication.authenticated) {
            navigate("/dashboard");
        }
    }, [authentication.authenticated]);

    const handleSubmitFn = (data: IFormInput) => {
        // e.preventDefault();
        dispatch(login());
    };

    const { register, handleSubmit, formState: { errors }, trigger } = useForm<IFormInput>();
    return (
        <div className='login-form'>
            {isLoading && <LoadingIndicator />}
            <h2>Login</h2>
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
                                errorMessage={(errors.email && "This field is required") || ""}
                                label='Email'
                                name='email'
                                placeholder='Email'
                                required={true}
                                register={register}
                                onInputChange={(name, value) => {
                                    dispatch(loginChange({ ...loginFormData, [name]: value }));
                                    trigger('email');
                                }}
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
                                onInputChange={(name, value) => {
                                    dispatch(loginChange({ ...loginFormData, [name]: value }));
                                    trigger('password');
                                }}
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
                <div className='d-flex flex-column flex-md-row align-items-md-center justify-content-between'>
                    <div className='d-flex justify-content-between align-items-center mb-3 mb-md-0'>
                        <Button
                            type='submit'
                            variant='primary'
                            text='Login'
                            disabled={isSubmitting}
                        />
                        <Button
                            text='Create an account'
                            variant='link'
                            className='ml-md-3'
                            onClick={registerLink}
                        />
                    </div>
                    <Link
                        className='redirect-link forgot-password-link'
                        to={'/forgot-password'}
                    >
                        Forgot Password?
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login;