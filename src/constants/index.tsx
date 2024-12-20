

export const API_URL = process.env.API_URL || 'https://backend.aapan.shop/api';

export const SOCKET_URL =
    window.location.host.indexOf('localhost') >= 0
        ? API_URL
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

