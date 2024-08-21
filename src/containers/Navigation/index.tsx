import React from 'react';
import Header from '../Header';
const Navigation: React.FC = ({ children }: any) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}

export default Navigation;