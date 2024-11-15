import { DEFAULT_ACTION } from './constants';

import { Action } from 'redux';

// export interface Brand {
//     _id: string;
//     name: string;
//     description: string;
//     isActive: boolean;
//     createdAt: string;
//     updatedAt: string;
// }

// export interface BrandState {
//     brands: Brand[];
//     brandsSelect: {
//         value: string;
//         label: string;
//     }[];
//     isLoading: boolean;
// }

export interface DefaultAction extends Action {
    type: typeof DEFAULT_ACTION;
}

// export type BrandActionTypes = DefaultAction; 