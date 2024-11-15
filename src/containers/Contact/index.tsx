import React, { PureComponent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
// import actions from '../../actions';
import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import { useForm } from "react-hook-form";
import { contactUs, contactFormChange } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ContactActionTypes } from './interface';
import { ThunkDispatch } from 'redux-thunk';
import { ContactFormData } from "./interface";
import NewInput from '../../components/Common/NewInput';
// interface ContactProps {
//     contactFormData: {
//         name: string;
//         email: string;
//         message: string;
//     };
//     formErrors: {
//         name: string;
//         email: string;
//         message: string;
//     };
//     contactFormChange: (name: string, value: string) => void;
//     contactUs: () => void;
// }

const Contact = () => {

    const dispatch = useDispatch<ThunkDispatch<RootState, null, ContactActionTypes>>();
    const contactFormData = useSelector((state: RootState) => state.contact.contactFormData);
    const formErrors = useSelector((state: RootState) => state.contact.formErrors);

    const onSubmit = (data: ContactFormData) => {
        dispatch(contactUs());
    }

    const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();


    // render() {?
    //     const { contactFormData, contactFormChange, formErrors } = this.props;

    return (
        <div className='contact'>
            <h3 className='text-uppercase'>Contact Information</h3>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col xs='12' md='6'>
                        {/* <Input
                            type='text'
                            error={formErrors['name'][0]}
                            label='Name'
                            name='name'
                            placeholder='Your Full Name'
                            value={contactFormData.name}
                            onInputChange={(name, value) => {
                                dispatch(contactFormChange(name, value));
                            }}
                        /> */}
                        <NewInput
                            fieldType='input'
                            label='Name'
                            name='name'
                            register={register}
                            required={true}
                            errorMessage={(errors.name?.message || 'something went wrong')}
                            type='text'
                            placeholder='Your Full Name'
                            value={contactFormData.name}
                            onInputChange={(name, value) => {
                                dispatch(contactFormChange(name, value));
                            }}
                        />

                    </Col>
                    <Col xs='12' md='6'>
                        <Input
                            type='text'
                            error={formErrors['email'][0]}
                            label='Email'
                            name='email'
                            placeholder='Your Email Address'
                            value={contactFormData.email}
                            onInputChange={(name, value) => {
                                dispatch(contactFormChange(name, value));
                            }}
                        />
                    </Col>
                    <Col xs='12' md='12'>
                        <Input
                            type='textarea'
                            error={formErrors['message'][0]}
                            label='Message'
                            name='message'
                            placeholder='Please Describe Your Message'
                            value={contactFormData.message}
                            onInputChange={(name, value) => {
                                dispatch(contactFormChange(name, value));
                            }}
                        />
                    </Col>
                </Row>
                <hr />
                <div className='contact-actions'>
                    <Button type='submit' text='Submit' />
                </div>
            </form>
        </div>
    );
}


export default Contact;