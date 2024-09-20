import { combineReducers } from "redux";
import authentication from './containers/Authentication/reducer';
import signup from './containers/Signup/reducer';
import login from './containers/Login/reducer';
const rootReducer =  combineReducers({
    // add all reducers here
    authentication,
    signup,
    login
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;