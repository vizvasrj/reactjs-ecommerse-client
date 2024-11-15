import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { ClearAuthAction } from "../Authentication/action";

import { useDispatch, UseDispatch } from "react-redux";
import { signOut } from "../Login/actions";
import { RootState } from "../../reducer";
import { useNavigate } from "react-router";

const Signout: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, ClearAuthAction>>();
    const navigate = useNavigate();
    React.useEffect(() => {
        dispatch(signOut())
        navigate('/')
    }, [])

    return (
        <div>
            <h3>Sorry to see you go</h3>
        </div>
    )
}

export default Signout;