import { TOGGLE_DASHBOARD_MENU } from './constants';


export type DashboardActionTypes = {
    type: typeof TOGGLE_DASHBOARD_MENU;
};

export const toggleDashboardMenu = (): DashboardActionTypes => {
    return {
        type: TOGGLE_DASHBOARD_MENU
    };
};
