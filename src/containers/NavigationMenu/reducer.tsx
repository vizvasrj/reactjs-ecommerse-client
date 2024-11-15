import { DEFAULT_ACTION } from './constants';
import { DefaultAction } from './interface';
interface State {
    // Define your state properties here
}

const initialState: State = {
    // Initialize your state properties here
};

const navigationMenuReducer = (state: State = initialState, action: DefaultAction) => {
    switch (action.type) {
        case DEFAULT_ACTION:
            return {
                ...state
            };
        default:
            return state;
    }
};

export default navigationMenuReducer;