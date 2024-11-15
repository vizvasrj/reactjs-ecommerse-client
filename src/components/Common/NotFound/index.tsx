import React, { FC, ReactNode } from 'react';

interface NotFoundProps {
    message?: string;
    className?: string;
    children?: ReactNode;
}

const NotFound: FC<NotFoundProps> = ({ message, className = '', children }) => {
    return (
        <div className={`not-found ${className}`}>
            {message ? message : children}
        </div>
    );
};

export default NotFound;