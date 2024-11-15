import { DEFAULT_ACTION } from './constants';

import {
    DefaultAction,
} from './interface';

export const defaultAction = (): DefaultAction => {
    return {
        type: DEFAULT_ACTION
    };
};