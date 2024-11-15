import React, { useEffect } from "react";
import { fetchBrandsSelect } from "../Brand/actions";
import AddProduct from "../../components/Manager/AddProduct";
import SubPage from "../../components/Manager/SubPage";
import { ThunkDispatch } from "redux-thunk";
import { BrandActionTypes } from "../Brand/actions";
import { RootState } from "../../reducer";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { addProduct, productChange } from "./actions";
import { navigate, NavigateActionType } from '../Navigate';

const Add: React.FC = () => {
    const { brands } = useSelector((state: RootState) => state.brand);
    const { user } = useSelector((state: RootState) => state.account);
    // const navigate = useNavigate();


    const { product, productFormData, formErrors } = useSelector((state: RootState) => state.product);


    const dispatch = useDispatch<ThunkDispatch<RootState, null, BrandActionTypes | NavigateActionType>>();
    useEffect(() => {
        dispatch(fetchBrandsSelect());
    }, []);

    const goBack = () => {
        dispatch(navigate(-1));
    }

    const handleAddProduct = () => {
        dispatch(addProduct());
    }

    // const 


    return (
        <>
            <SubPage
                title="Add Product"
                actionTitle="Cancel"
                handleAction={goBack}
            >
                <AddProduct
                    user={user}
                    productFormData={productFormData}
                    formErrors={formErrors}
                    brands={brands}
                    productChange={productChange}
                    addProduct={handleAddProduct}
                />
            </SubPage>
        </>
    )

}

export default Add;