import React, { useCallback } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "../Navigation";
import Home from "../Home";
import { Container } from 'reactstrap';
import Signout from "../Signout";
import NavigateToPath from "../Navigate";
import Notification from '../Notification';
import Cart from "../Cart";
import Sell from "../Sell";
import Contact from "../Contact";
import BrandsPage from "../BrandsPage";
import ProductPage from "../ProductPage";
import OrderSuccess from "../OrderSuccess";
import OrderPage from "../OrderPage";
import Login from "../Login";
import Signup from "../Signup";
import MerchantSignup from "../MerchantSignup";
import ForgotPassword from "../ForgotPassword";
import ResetPassword from "../ResetPassword";
import AuthSuccess from "../AuthSuccess";
import Support from "../Support";
import Dashboard from "../Dashboard";
// import TermsAndConditions from "../TermsAndConditions";
import Page404 from '../../components/Common/Page404';

// *
import Shop from '../Shop';
import OrderAddressForm from "../OrderAddressForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducer";
import { useEffect } from "react";
import { handleCart } from "../Cart/actions";
import { fetchProfile } from "../Account/action";
import { AccountAction } from "../Account/action";
import { ThunkDispatch } from "redux-thunk";
import CartV2 from "../CartV2";
import { setCartId } from "../Cart/actions";
import { CartActionTypes } from "../Cart/interface";
// import { fetchStoreCategories } from "../Category/actions";
// import { FetchCategoriesAction } from "../Category/interface";
// import { fetchStoreBrands } from "../Brand/actions";
const Application: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, AccountAction | CartActionTypes>>();
    const handleStorage = useCallback((e: StorageEvent) => {
        if (e.key === 'CART_ITEMS') {
            dispatch(handleCart());
        }
    }, [handleCart]);
    useEffect(() => {
        console.log("api url", process.env.API_URL);
    }, []);

    const handleTabbing = useCallback((e: KeyboardEvent) => {
        if (e.key === "Tab") {
            document.body.classList.add('user-is-tabbing');
        }
    }, []);

    const handleMouseDown = useCallback(() => {
        document.body.classList.remove('user-is-tabbing');
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');

        console.log("I have token   ", token);

        if (token) {
            console.log("from src.containers.Application.index.tsx: I have token   ", token);
            dispatch(fetchProfile());
        }

        dispatch(handleCart());

        document.addEventListener('keydown', handleTabbing);
        document.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('storage', handleStorage);

        return () => {
            document.removeEventListener('keydown', handleTabbing);
            document.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('storage', handleStorage);
        };
    }, [handleStorage, handleTabbing, handleMouseDown, fetchProfile, handleCart]);



    return (
        <div className='application'>
            <BrowserRouter>
                <NavigateToPath />
                <Notification />

                <Navigation />
                <main className='main'>
                    <Container>
                        <div className='wrapper'>
                            <Routes>
                                {/* <Route path="/" element={<Home />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signout" element={<Signout />} />
                                <Route path="/dashboard" element={<Dashboard />} /> */}
                                <Route path='/login' element={<Login />} />
                                <Route path='/register' element={<Signup />} />
                                <Route path="/signout" element={<Signout />} />

                                <Route path='/' element={<Shop />} />
                                {/* <Route path='/shop' element={Shop} /> */}
                                {/* // <Route path='/cart/payment' element={Authentication(PaymentButton)} /> */}
                                {/* <Route path='/cart/address' element={<OrderAddressForm />} /> */}
                                <Route path='/cart/*' element={<CartV2 />} />
                                {/* <Route path="/cart" */}
                                <Route path='/sell' element={<Sell />} />
                                <Route path='/contact' element={<Contact />} />
                                <Route path='/brands' element={<BrandsPage />} />
                                <Route path='/product/:slug' element={<ProductPage />} />
                                <Route path='/order/success/:id' element={<OrderSuccess />} />
                                <Route path='/order/:id' element={<OrderPage />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/register' element={<Signup />} />
                                <Route
                                    path='/merchant-signup/:token'
                                    element={<MerchantSignup />}
                                />
                                <Route path='/forgot-password' element={<ForgotPassword />} />
                                <Route
                                    path='/reset-password/:token'
                                    element={<ResetPassword />}
                                />
                                <Route path='/auth/success' element={<AuthSuccess />} />
                                <Route path='/support' element={<Support />} />
                                <Route
                                    path='/dashboard/*'
                                    element={<Dashboard />}
                                />
                                {/* <Route path='/terms-and-conditions' element={TermsAndConditions} /> */}
                                {/* <Route
                                    path='/refund-cancellation-policies'
                                    element={RefundCancellationPolicies}
                                /> */}
                                {/* <Route path='/privacy-policy' element={PrivacyPolicy} /> */}

                                <Route path='/404' element={<Page404 />} />
                                <Route path='*' element={<Page404 />} />
                            </Routes>
                        </div>
                    </Container>

                </main>
            </BrowserRouter>

        </div>
    )
}

export default Application;