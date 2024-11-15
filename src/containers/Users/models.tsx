import { ROLES } from "../../constants";
export interface User {
    _id: string;
    // id changed to _id 
    // i changed id to string type 
    name: string;
    email: string;
    phone: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    provider: string;
    created: string;
    role: ROLES;
    online: boolean;
}