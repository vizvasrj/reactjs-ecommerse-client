import {
    ACCOUNT_CHANGE,
    FETCH_PROFILE,
    CLEAR_ACCOUNT,
    SET_PROFILE_LOADING
} from './constants';
import { User } from './interface';


interface State {
    user: User;
    isLoading: boolean;
}

const initialState: State = {
    user: {
        firstName: '',
        lastName: '',
        provider: '',
        // role: ROLES.Member
    } as User,
    isLoading: false
};

const accountReducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case ACCOUNT_CHANGE:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            };
        case FETCH_PROFILE:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            };
        case CLEAR_ACCOUNT:
            return {
                ...state,
                user: {
                    firstName: '',
                    lastName: ''
                }
            };
        case SET_PROFILE_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };

        default:
            return state;
    }
};

export default accountReducer;