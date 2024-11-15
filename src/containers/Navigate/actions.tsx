import { NAVIGATE } from './constants';
import { NavigateAction } from './interface';

export function navigate(path: string | number): NavigateAction {
    return {
        type: NAVIGATE,
        payload: path
    };
}
