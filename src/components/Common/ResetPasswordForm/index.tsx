import React from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../NewInput';
import Button from '../Button';
import { useForm } from 'react-hook-form';

interface ResetPasswordFormProps {
    isToken: boolean;
    password: string;
    confirmPassword: string;
    resetPassword: (data: { password: string; confirmPassword: string }) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
    isToken,
    resetPassword
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormProps>();

    return (
        <div className='reset-password-form'>
            <form onSubmit={handleSubmit(resetPassword)} noValidate>
                <Row>
                    <Col xs='12' lg='6'>
                        <Input
                            fieldType='input'
                            type={'password'}
                            errorMessage={(errors.password && 'Password is required') || ""}
                            label={'Password'}
                            name={'password'}
                            placeholder={'Password'}
                            required={true}
                            onInputChange={() => { }}
                            register={register}
                        />
                    </Col>
                    <Col xs='12' lg='6'>
                        <Input
                            fieldType='input'
                            type={'password'}
                            errorMessage={(errors.confirmPassword && 'Confirm Password is required') || ""}
                            label={'Confirm Password'}
                            name={'confirmPassword'}
                            placeholder={'Confirm Password'}
                            required={true}
                            onInputChange={() => { }}
                            register={register}
                        />
                    </Col>
                </Row>
                <hr />
                <div className='reset-actions'>
                    <Button type='submit' text='Reset Password' />
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordForm;