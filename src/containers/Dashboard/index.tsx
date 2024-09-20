import React from "react";
import requireAuth from "../Authentication";
import { useSelector } from "react-redux";
import { RootState } from "../../reducer";


const Dashboard: React.FC = () => {

    const authenticated = useSelector((state: RootState) => state.authentication.authenticated);

    return (

        <div style={{}}>
            <h1>dashboard</h1>
            <div>
                <div>is auth
                    <p>{authenticated.toString()}</p>
                </div>
            </div>
        </div>

    )

}

export default requireAuth(Dashboard);