import React from "react";

import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from "./reducer";
import { BrowserRouter, Routes } from "react-router-dom";
import Application from "./containers/Application";
import * as constants from './constants';

import '../src/styles/style.scss';
// import 'font-awesome/css/font-awesome.min.css';
// import 'simple-line-icons/css/simple-line-icons.css';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// rc-slider style
import 'rc-slider/assets/index.css';

console.log(process.env.API_URL, "from rootapp.tsx");

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