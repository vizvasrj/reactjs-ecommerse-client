import React from "react";

import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from "./reducer";
import { BrowserRouter, Routes } from "react-router-dom";
import Application from "./containers/Application";

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(thunk),
})

const RootApp: React.FC = () => {
    return (
        <Provider store={store}>
            {/* <BrowserRouter>
                <Routes> */}
                    {/* Add routes here */}
                    <Application />
                {/* </Routes>
            </BrowserRouter> */}
        </Provider>
    )
}

export default RootApp;