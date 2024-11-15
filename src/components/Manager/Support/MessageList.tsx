import React, { useEffect, useRef, memo } from 'react';

import { getMemoizedRandomColors } from '../../../utils';
import { formatTime } from '../../../utils/date';
import NotFound from '../../Common/NotFound';
import { User } from '../../../containers/Users/models';
export interface Message {
    id: string;
    from: string;
    noHeader: boolean;
    user: User;
    time: Date;
    value: string;
    to: string;

}

interface MessagesListProps {
    user: User;
    messages: Message[];
}

const MessagesList: React.FC<MessagesListProps> = (props) => {
    const { user, messages } = props;
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const msgsLength = messages.length;
    const emptyMsgs = msgsLength > 0 ? false : true;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [msgsLength]);

    const renderMessages = () =>
        messages.map((message) => (
            <Message
                key={message.id}
                message={message}
                isMe={message.from === user._id}
                noHeader={message.noHeader}
            />
        ));

    return (
        <>
            {messages && !emptyMsgs ? (
                <div className={`m-list ${!emptyMsgs ? '' : 'empty'}`}>
                    {renderMessages()}
                    <div ref={messagesEndRef} />
                </div>
            ) : (
                <div className='my-4'>
                    <NotFound message='No messages found.' />
                </div>
            )}
        </>
    );
};

const Message: React.FC<{
    message: Message;
    isMe: boolean;
    noHeader: boolean;
}> = memo((props) => {
    const { message, isMe, noHeader } = props;

    const getAvatar = (m: Message) => {
        const color = getMemoizedRandomColors(m.from);

        if (m.user.name) {
            return (
                <div
                    className='d-flex flex-column justify-content-center align-items-center fw-normal text-white avatar '
                    style={{ backgroundColor: color ? color : 'red' }}
                >
                    {m.user.name.charAt(0)}
                </div>
            );
        }
    };

    return (
        <div className='m-container'>
            <div
                className={`d-flex ${isMe ? 'justify-content-end' : 'justify-content-start'
                    }`}
            >
                {!isMe && (
                    <div className='mr-2 avatar-box'>
                        {!noHeader && <> {getAvatar(message)}</>}
                    </div>
                )}

                <div>
                    {isMe ? (
                        <div className='mb-2 text-right text-black'>
                            {formatTime(message.time.toString())}
                        </div>
                    ) : (
                        <div className={`d-flex mb-2 text-right`}>
                            {!noHeader && (
                                <>
                                    <p className={`mb-0 fw-normal text-black`}>
                                        {message.user.name}
                                    </p>
                                    <div className='ml-2 text-black'>
                                        {formatTime(message.time.toString())}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <p className={`${isMe ? 'me' : ''} m-box`}>{message.value}</p>
                </div>
            </div>
        </div>
    );
});

export default MessagesList;