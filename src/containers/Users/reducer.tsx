import {
    FETCH_USERS,
    FETCH_SEARCHED_USERS,
    SET_ADVANCED_FILTERS,
    SET_USERS_LOADING
} from './constants';
import { UserActionTypes } from './actions';

import { User } from './models';

interface AdvancedFilters {
    totalPages: number;
    currentPage: number;
    count: number;
}

interface State {
    users: User[];
    searchedUsers: User[];
    advancedFilters: AdvancedFilters;
    isLoading: boolean;
}

const initialState: State = {
    users: [] as User[],
    searchedUsers: [],
    advancedFilters: {
        totalPages: 1,
        currentPage: 1,
        count: 0
    } as AdvancedFilters,
    isLoading: false
};


const usersReducer = (state: State = initialState, action: UserActionTypes): State => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: action.payload
            };
        case FETCH_SEARCHED_USERS:
            return {
                ...state,
                searchedUsers: action.payload
            };
        case SET_ADVANCED_FILTERS:
            return {
                ...state,
                advancedFilters: {
                    ...state.advancedFilters,
                    ...action.payload
                }
            };
        case SET_USERS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
};

export default usersReducer;