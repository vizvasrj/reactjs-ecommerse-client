import React, { useState } from 'react';
import io, { Socket } from 'socket.io-client';
import SocketContext from './context';
import { SOCKET_URL } from '../../constants';
// SocketIOClient.Socket
const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    const connect = () => {
        const token = localStorage.getItem('token');
        const sk = io(SOCKET_URL, {
            autoConnect: false
        });

        if (token) {
            sk.auth = { token };
            sk.connect();
            setSocket(sk);
        }
    };

    const disconnect = () => {
        if (socket) {
            socket.close();
        }
    };

    return (
        <SocketContext.Provider value={{ socket, connect, disconnect }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;