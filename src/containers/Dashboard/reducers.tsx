import { DashboardActionTypes } from './actions';
import { TOGGLE_DASHBOARD_MENU } from './constants';

interface DashboardState {
    isMenuOpen: boolean;
}

const initialState: DashboardState = {
    isMenuOpen: false
};

const dashboardReducer = (state: DashboardState = initialState, action: DashboardActionTypes): DashboardState => {
    switch (action.type) {
        case TOGGLE_DASHBOARD_MENU:
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            };
        default:
            return state;
    }
};

export default dashboardReducer;