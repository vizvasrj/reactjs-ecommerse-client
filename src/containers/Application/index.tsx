import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "../Navigation";
import Home from "../Home";
import Signup from "../Signup";
import Login from "../Login";
import { Container } from 'reactstrap';
import Signout from "../Signout";
import Dashboard from "../Dashboard";

const Application: React.FC = () => {
    return (
        <div className='application'>
            <BrowserRouter>
                <Navigation />
                <main className='main'>
                    <Container>
                        <div className='wrapper'>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signout" element={<Signout />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                            </Routes>
                        </div>
                    </Container>

                </main>
            </BrowserRouter>

        </div>
    )
}

export default Application;