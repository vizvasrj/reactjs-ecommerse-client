import React from "react";
import { Routes, Route } from "react-router";

import Callback from "./Callback";
import PaymentRedirect from "./PaymentRedirect";
import RazorPay from "./RazorPay";

const Payment: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<RazorPay />} />
            {/* <Route path="/" element={<PaymentRedirect />} /> */}
            <Route path="/callback" element={<Callback />} />
        </Routes>
    );
};

export default Payment;