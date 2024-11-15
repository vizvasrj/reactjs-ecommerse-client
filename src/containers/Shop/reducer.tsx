import { DEFAULT_ACTION } from './constants';

interface State {
    // Define your state properties here
}

const initialState: State = {
    // Initialize your state properties here
};

const productsReducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case DEFAULT_ACTION:
            return {
                ...state
            };
        default:
            return state;
    }
};

export default productsReducer;