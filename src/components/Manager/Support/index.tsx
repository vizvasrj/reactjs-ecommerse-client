import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';

import { useSocket } from '../../../contexts/Socket';
import AddMessage from './AddMessage';
import MessageList from './MessageList';
import UserList from './UserList';
import NotFound from '../../Common/NotFound';
import { User } from '../../../containers/Users/models';
import { Message } from "./MessageList";

// interface Message {
//     text: string;
//     from: string;
//     to: string;
//     time: number;
//     noHeader?: boolean;
// }

const Support: React.FC<{ user: User }> = ({ user }) => {
    const { socket, connect, disconnect } = useSocket();
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [activeChat, setActiveChat] = useState<Message[]>([]);

    useEffect(() => {
        connect();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit('connectUser');
            socket.emit('getUsers');
            socket.emit('getMessages');
            socket.on('getUsers', (users: User[]) => {
                setUsers(users);
            });
            socket.on('getMessages', (msgs: Message[]) => {
                setMessages((prevState) => [...prevState, ...msgs]);
            });
            socket.on('message', onMessage);
        }

        return () => {
            disconnect();
        };
    }, [socket]);

    useEffect(() => {
        if (socket && users) {
            socket.on('connectUser', (user: User) => {
                const index = users.findIndex((u) => u._id === user._id);
                let newUsers = [...users];
                if (index !== -1) {
                    newUsers[index] = user;
                } else {
                    newUsers = [...newUsers, user];
                }
                setUsers(newUsers);
            });

            socket.on('disconnectUser', (user: User) => {
                const index = users.findIndex((u) => u._id === user._id);
                const newUsers = [...users];
                if (index !== -1) {
                    newUsers[index] = user;
                }
                setUsers(newUsers);
            });
        }
    }, [socket, users]);

    useEffect(() => {
        if (messages.length > 0) {
            if (selectedUser) {
                selectUser(selectedUser);
            } else {
                const user_id = localStorage.getItem('selected_suport_chat');
                if (user_id) {
                    const user = users.find((u) => u._id === user_id);
                    if (user) selectUser(user);
                }
            }
        }
    }, [messages]);

    const onMessage = (message: Message) => {
        setMessages((prevState) => [...prevState, message]);
    };

    const selectUser = (user: User) => {
        setSelectedUser(user);
        const msgs = getUserMsgs(user);
        setActiveChat(msgs);
        localStorage.setItem('selected_suport_chat', user._id);
    };

    const getUserMsgs = (user: User) => {
        const sentMsgs = messages.filter((m) => m.from === user._id);
        const receivedMsgs = messages.filter((m) => m.to === user._id);
        const msgs = [...sentMsgs, ...receivedMsgs].sort((a, b) => a.time.getTime() - b.time.getTime());

        const updatedMsgs: Message[] = [];
        for (let i = 0; i < msgs.length; i++) {
            const previousMsg = msgs[i - 1];
            const currentMsg = msgs[i];
            if (previousMsg && previousMsg.from === currentMsg.from && i !== 0) {
                currentMsg.noHeader = true;
            } else {
                currentMsg.noHeader = false;
            }
            updatedMsgs.push(currentMsg);
        }
        return updatedMsgs;
    };

    const onMessageSubmit = (message: string) => {
        if (!selectedUser) return;
        socket.emit('message', {
            text: message,
            to: selectedUser?._id,
        });
    };

    return (
        <>
            {socket ? (
                <>
                    {users.length > 0 ? (
                        <Row>
                            <Col xs='12' md='4' xl='3'>
                                <UserList
                                    users={users}
                                    selectedUser={selectedUser}
                                    selectUser={selectUser}
                                />
                            </Col>
                            <Col xs='12' md='8' xl='9'>
                                {selectedUser ? (
                                    <div>
                                        <h4 className='text-center text-md-left mt-3 mt-md-0'>
                                            {selectedUser?.name}
                                        </h4>
                                        <MessageList user={user} messages={activeChat} />
                                        <AddMessage
                                            // socket={socket} 
                                            onSubmit={onMessageSubmit} />

                                    </div>
                                ) : (
                                    <div className='d-flex flex-column justify-content-center h-100 p-4 p-md-0'>
                                        <NotFound message='Select chat to start messaging' />
                                    </div>
                                )}
                            </Col>
                        </Row>
                    ) : (
                        <NotFound message='No users connected.' />
                    )}
                </>
            ) : (
                <NotFound message='Not connected.' />
            )}
        </>
    );
};

export default Support;