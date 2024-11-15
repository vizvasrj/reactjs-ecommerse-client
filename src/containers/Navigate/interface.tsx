import { NAVIGATE } from './constants';

export interface NavigateAction {
    type: typeof NAVIGATE;
    payload: string | number;
    [extraProps: string]: any;
}


