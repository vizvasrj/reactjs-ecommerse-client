import React, { useState } from 'react';

import Input from '../../Common/Input';
import Button from '../../Common/Button';

interface AddMessageProps {
    onSubmit: (message: string) => void;
}

const AddMessage: React.FC<AddMessageProps> = ({ onSubmit }) => {
    const [message, setMessage] = useState('');

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) {
            return alert('Please type message.');
        }
        onSubmit(message);
        setMessage('');
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <Input
                autoComplete='off'
                type={'text'}
                name={'message'}
                placeholder='type message'
                value={message}
                onInputChange={(_, value) => {
                    if (typeof value === 'string') {
                        setMessage(value);
                    }
                }}
                inlineElement={<SendButton disabled={!message} />}
            />
        </form>
    );
};

interface SendButtonProps {
    disabled: boolean;
}

const SendButton: React.FC<SendButtonProps> = ({ disabled }) => (
    <Button type='submit' disabled={disabled} variant='primary' text='Send' />
);

export default AddMessage;