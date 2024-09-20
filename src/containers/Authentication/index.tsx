import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../reducer';


export default function requireAuth(ComposedComponent: React.ComponentType<React.FC>) {
    return (props: any) => {
        const navigate = useNavigate();
        const authenticated = useSelector((state: RootState) =>
            state.authentication.authenticated);

        // const shouldNavigateAway = () => {
        //     if (!authenticated) {
        //         navigate("/");
        //         console.log("Navigate away");
        //     } else {
        //         console.log("Stay here");
        //     }
        // }
        // useEffect(() => {
        //     shouldNavigateAway();
        // }, [authenticated]);


        useEffect(() => {
            if (!authenticated) {
                navigate("/");
            }
        }, [authenticated]);

        // If the user is authenticated, render the component; otherwise, render nothing
        return authenticated ? <ComposedComponent {...props} /> : null;
    }

}