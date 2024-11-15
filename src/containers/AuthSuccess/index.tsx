import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import setToken from '../../utils/token';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { SetAuthAction, setAuth } from '../Authentication/action';
import { useLocation } from 'react-router';


const AuthSuccess: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, SetAuthAction>>();
    const authenticated = useSelector((state: RootState) => state.authentication.authenticated);
    const location = useLocation();

    useEffect(() => {
        const tokenParam = location.search;

        const jwtCookie = tokenParam
            .slice(tokenParam.indexOf('=') + 1)
            .replace('%20', ' ');
        if (jwtCookie) {
            setToken(jwtCookie);
            localStorage.setItem('token', jwtCookie);
            dispatch(setAuth());
        }
    }, [location.search, setAuth]);

    const navigate = useNavigate();
    if (authenticated) {
        navigate('/dashboard');
    }

    return <LoadingIndicator />;
};

export default AuthSuccess;