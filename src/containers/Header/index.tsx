import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducer";

import { signOut } from "../Login/actions";
import { ThunkDispatch } from "redux-thunk";
import { SignupActionTypes } from "../Signup/action";
const Header: React.FC = () => {
    const authenticated = useSelector((state: RootState) => state.authentication.authenticated);
    const linkStyle = {
        marginRight: "10px",
        color: "blue",
        textDecoration: "none",
        padding: "5px",
        border: "1px solid blue",
    };
    const dispatch = useDispatch<ThunkDispatch<RootState, null, SignupActionTypes>>();

    return (
        <div>
            <Link style={linkStyle} to="/">Home</Link>
            <Link style={linkStyle} to="/login">login</Link>
            <Link style={linkStyle} to="/signup">signup</Link>
            <Link style={linkStyle} to="/signout">signout</Link>
        </div>
    );
}

export default Header;