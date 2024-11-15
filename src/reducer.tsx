import { combineReducers } from "redux";
import authentication from './containers/Authentication/reducer';
import signup from './containers/Signup/reducer';
import login from './containers/Login/reducer';
import brand from './containers/Brand/reducer';
import product from './containers/Product/reducer';
import user from './containers/Users/reducer';
import account from './containers/Account/reducer';
import merchant from "./containers/Merchant/reducer";
import wishlist from "./containers/WishList/reducer";
import review from "./containers/Review/reducer";
import navigation from "./containers/Navigation/reducer";
import category from "./containers/Category/reducer";
import cart from "./containers/Cart/reducer";
import nav from "./containers/Navigate/reducer";
import address from "./containers/Address/reducer";
import order from "./containers/Order/reducer";
import dashboard from "./containers/Dashboard/reducers";
import resetPassword from "./containers/ResetPassword/reducer";
import contact from "./containers/Contact/reducer";
import forgotPassword from "./containers/ForgotPassword/reducer";
import payment from "./containers/Payment/reducer";

const rootReducer = combineReducers({
    // add all reducers here
    authentication,
    signup,
    login,
    brand,
    user,
    account,
    product,
    merchant,
    wishlist,
    review,
    navigation,
    category,
    cart,
    nav,
    address,
    order,
    dashboard,
    resetPassword,
    contact,
    forgotPassword,
    payment,
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;