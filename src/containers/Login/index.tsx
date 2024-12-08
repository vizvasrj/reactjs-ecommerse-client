import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
// import { redirect, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducer";
import { ThunkDispatch } from "redux-thunk";

import Input from "../../components/Common/NewInput";
import Button from "../../components/Common/Button";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import SignupProvider from "../../components/Common/SignupProvider";
import { login, loginChange, sendCodeGoogle } from "./actions";
import { useForm } from "react-hook-form";
import { LoginActionTypes } from "./actions";
import { selectSignupAndAuthentication } from "../../selectors/authselector";
import { navigate, NavigateActionType } from "../Navigate";

import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';


type IFormInput = {
    email: string;
    password: string;
};

// This function will be called upon a successful login

const Login: React.FC = () => {

    const google_client_id = "1087793298630-r5jpl3gu8d2h9vg01014ju2491ihpjvn.apps.googleusercontent.com";


    // const navigate = useNavigate();
    // const { login, authentication } = useSelector((state: RootState) => ({
    //     login: state.login,
    //     authentication: state.authentication
    // }));
    const registerLink = () => {
        dispatch(navigate("/register"))
    }
    // const { login: loginState, authentication } = useSelector(selectSignupAndAuthentication);

    const dispatch = useDispatch<ThunkDispatch<RootState, null, LoginActionTypes | NavigateActionType>>();
    // const { isLoading, isSubmitting, loginFormData } = loginState;
    const isLoading = useSelector((state: RootState) => state.login.isLoading);
    const isSubmitting = useSelector((state: RootState) => state.login.isSubmitting);
    const loginFormData = useSelector((state: RootState) => state.login.loginFormData);
    const authentication = useSelector((state: RootState) => state.authentication);
    // if (authentication.authenticated) {
    //     navigate("/dashboard");
    // }
    useEffect(() => {
        if (authentication.authenticated) {
            dispatch(navigate("/dashboard"));
        }
    }, [authentication.authenticated]);

    const handleSubmitFn = (data: IFormInput) => {
        // e.preventDefault();
        dispatch(login());
    };



    // * Google Login Start
    const [user, setUser] = React.useState<any>(null);
    const [profile, setProfile] = React.useState<any>(null);

    const handleSuccess = (credentialResponse: any) => {
        // If you are using the authorization code flow, you will receive a code to be exchanged for an access token
        const authorizationCode = credentialResponse.code;
        console.log("response", credentialResponse);

        // Send the authorization code to your backend server
        dispatch(sendCodeGoogle(credentialResponse.credential));
    };

    const handleError = (errorResponse: any) => {
        console.error('Google login failed', errorResponse);
    };


    const googleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async codeResponse => {
            console.log('codeResponse', codeResponse);
            // Send the authorization code to your backend server
            dispatch(sendCodeGoogle(codeResponse.code));
        },
        onError: errorResponse => {
            console.error('Google login failed', errorResponse);
        }
    });

    // * Google Login End
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
                    <Button text="Google Login" onClick={googleLogin} />

                </div>
            </form>
        </div>
    )
}

export default Login;