import React from 'react';

interface LoadingIndicatorProps {
    inline?: boolean;
    backdrop?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
    inline = false,
    backdrop = false
}) => {
    return (
        <div
            className={`spinner-container${
                inline ? ' position-relative' : ' position-fixed overlay'
            } ${backdrop ? 'backdrop' : ''}`}
        >
            <div
                className={`spinner${
                    inline ? ' position-relative' : ' position-fixed overlay'
                }`}
            ></div>
        </div>
    );
};

export default LoadingIndicator;