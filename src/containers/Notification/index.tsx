import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface NotificationState {
    message: string;
    type: string;
    
}

interface NotificationProps {
    notifications: NotificationState[];
    clearNotification: () => void;
}

const Notification: React.FC<NotificationProps> = ({ }) => {
    // useEffect(() => {
    //     notifications.forEach((notification) => {
    //         toast(notification.message, {

    //         });
    //     });
    // }, [notifications, clearNotification]);

    return <ToastContainer />;
};


export default Notification;