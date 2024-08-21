import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "../Navigation";
import Home from "../Home";
import Signup from "../Signup";
const Application: React.FC = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Application;