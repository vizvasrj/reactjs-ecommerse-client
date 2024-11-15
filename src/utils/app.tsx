import { ROLES, EMAIL_PROVIDER } from '../constants';

export const isProviderAllowed = (provider: string): boolean =>
    provider === EMAIL_PROVIDER.Google || provider === EMAIL_PROVIDER.Facebook;

export const isDisabledMerchantAccount = (user: any): boolean =>
    user.role === ROLES.Merchant &&
    user.merchant &&
    user.merchant.isActive === false;