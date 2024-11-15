import { ROLES } from '../../constants';

export interface User {
    firstName: string;
    lastName: string;
    provider: string;
    phoneNumber: string;
    email: string;

    role: ROLES
}