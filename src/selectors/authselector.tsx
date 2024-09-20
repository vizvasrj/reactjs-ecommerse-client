import { createSelector } from 'reselect';
import { RootState } from '../reducer';

const selectSignup = (state: RootState) => state.signup;
const selectAuthentication = (state: RootState) => state.authentication;
const selectLogin = (state: RootState) => state.login;

export const selectSignupAndAuthentication = createSelector(
    [selectSignup, selectAuthentication, selectLogin],
    (signup, authentication, login) => ({ signup, authentication, login })
);