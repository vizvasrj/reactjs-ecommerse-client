import React, { ReactNode } from 'react';
import { ComingSoonProps } from './model';

const ComingSoon: React.FC<ComingSoonProps> = ({ children }) => {
    return (
        <div className='coming-soon'>
            <h3>Coming soon</h3>
            {children}
        </div>
    );
};

export default ComingSoon;