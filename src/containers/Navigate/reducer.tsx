import { NAVIGATE } from "./constants";
import { NavigateAction } from "./interface";

const initialState = {
    path: ""
};

const navigationReducer = (state = initialState, action: NavigateAction) => {
    switch (action.type) {
        case NAVIGATE:
            return {
                ...state,
                path: action.payload
            };
        default:
            return state;
    }
}

export default navigationReducer;