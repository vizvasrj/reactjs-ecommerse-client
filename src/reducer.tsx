import { combineReducers } from "redux";
import authentication from './containers/Authentication/reducer';
import signup from './containers/Signup/reducer';
const rootReducer =  combineReducers({
    // add all reducers here
    authentication,
    signup,

})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;