import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducer";
import { useNavigate } from "react-router-dom";
import { navigate } from "./actions";
import { NavigateAction } from "./interface";

const NavigateToPath: React.FC = () => {
    const { path } = useSelector((state: RootState) => state.nav);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (path) {
            if (typeof path === 'string') {
                navigate(path);
            } else if (typeof path === 'number') {
                navigate(path);
            }
        }
    }, [path]);

    return null;
}

export default NavigateToPath;

export {
    navigate,
    // NavigateToPath
    // NavigateAction
}
export type NavigateActionType = NavigateAction;