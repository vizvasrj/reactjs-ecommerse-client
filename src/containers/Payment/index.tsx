import React from "react";
import { Routes, Route } from "react-router";

import Callback from "./Callback";
import PaymentRedirect from "./PaymentRedirect";

const Payment: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<PaymentRedirect />} />
            <Route path="/callback" element={<Callback />} />
        </Routes>
    );
};

export default Payment;