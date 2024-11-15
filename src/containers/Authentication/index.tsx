import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../reducer';


export default function requireAuth(ComposedComponent: React.ComponentType<React.FC>) {
    return (props: any) => {
        // console.log("logs")
        const navigate = useNavigate();
        const authenticated = useSelector((state: RootState) =>
            state.authentication.authenticated);
        // console.log(authenticated, "authenticated", "BOOLEAN");

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
            // console.log("authenticated", authenticated, "@@", "i am redirecting, if not authenticated");
            if (!authenticated) {
                navigate("/login");
                // console.log("Navigate away");

            }
        }, [authenticated]);

        // If the user is authenticated, render the component; otherwise, render nothing
        return authenticated ? <ComposedComponent {...props} /> : null;
    }

}