import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
const filteredEnv: { [key: string]: string } = {};
for (const key in process.env) {
    if (process.env[key] !== undefined) {
        filteredEnv[key] = process.env[key] as string;
    }
}
const parsed = { API_URL: 'https://golang-ecommerse-backend-1.onrender.com/api' }

dotenv.populate(filteredEnv, parsed)



process.env.API_URL = 'https://golang-ecommerse-backend-1.onrender.com/api'
export const API_URL = process.env.API_URL;
export const SOCKET_URL =
    window.location.host.indexOf('localhost') >= 0
        ? 'https://golang-ecommerse-backend-1.onrender.com/api'
        : window.location.host;

export enum ROLES {
    Admin = 'ROLE ADMIN',
    Member = 'ROLE MEMBER',
    Merchant = 'ROLE MERCHANT'
};

export const CART_ITEMS = 'cart_items';
export const CART_TOTAL = 'cart_total';
export const CART_ID = 'cart_id';

export enum CART_ITEM_STATUS {
    Processing = 'Processing',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled',
    Not_processed = 'Not processed'
};

export enum MERCHANT_STATUS {
    Rejected = 'Rejected',
    Approved = 'Approved',
    Waiting_Approval = 'Waiting Approval'
};

export enum REVIEW_STATUS {
    Rejected = 'Rejected',
    Approved = 'Approved',
    Waiting_Approval = 'Waiting Approval'
};

export enum EMAIL_PROVIDER {
    Email = 'Email',
    Google = 'Google',
    Facebook = 'Facebook'
};

