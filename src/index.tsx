import React from "react";

import ReactDOM from "react-dom/client";
import RootApp from "./RootApp";
// import Checkbox from "./components/Common/Checkbox";
// import Button from "./components/Common/Button";
// // import { Input } from "reactstrap";
// // import Input from "./components/Common/Input";
import ReactStars from "./components/Package/react-stars";
// import Radio from "./components/Common/Radio";
// import RangeSlider from "./components/Common/RangeSlider";
// import ResetPasswordForm from "./components/Common/ResetPasswordForm";
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const google_client_id = process.env.GOOGLE_CLIENT_ID;

import { GoogleOAuthProvider } from '@react-oauth/google';
root.render(

    // <React.StrictMode>
    <GoogleOAuthProvider clientId="1087793298630-r5jpl3gu8d2h9vg01014ju2491ihpjvn.apps.googleusercontent.com">
        <RootApp />
    </GoogleOAuthProvider>
    // </React.StrictMode>

);

export { };