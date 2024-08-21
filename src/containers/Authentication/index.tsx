import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';

import { RootState } from '../../reducer';


export default function requireAuth(ComposedComponent: React.ComponentType<any>) {
    return (props: any) => {
        const navigate = useNavigate();
        const authenticated = useSelector((state: RootState) =>
            state.authentication.authenticated);

        const shouldNavigateAway = () => {
            if (!authenticated) {
                navigate("/");
                console.log("Navigate away");
            } else {
                console.log("Stay here");
            }
        }
        useEffect(() => {
            shouldNavigateAway();
        }, [authenticated]);

        // if (!authenticated) {
        //     redirect('/login');
        // } else {
        //     return <ComposedComponent {...props} />;
        // }
    }

}