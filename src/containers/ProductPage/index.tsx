import React, { useEffect, useRef } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import { BagIcon } from '../../components/Common/Icon';
import ProductReviews from '../../components/Store/ProductReviews';
import SocialShare from '../../components/Store/SocialShare';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { CartItem, CartActionTypes } from '../Cart/interface';
import { ProductActionTypes, Product } from '../Product/interface';
import { ReviewActionTypes } from '../Review/interface';


import { fetchStoreProduct, productShopChange } from '../Product/actions';
import { addProductReview, reviewChange } from '../Review/actions';
import { fetchProductReviews } from '../Review/actions';
import { handleAddToCart, handleAddProductToCart, handleRemoveFromCart, clearCart } from '../Cart/actions';
import { SelectOptionType } from '../../components/Common/SelectOption';

interface ShopFormErrors {
    quantity: string;
}

const shopFormErrors: ShopFormErrors | Validator.ValidationErrors | {} = {};

// Type guard to check if shopFormErrors has the quantity property
function hasQuantityError(errors: any): errors is ShopFormErrors {
    return (errors as ShopFormErrors).quantity !== undefined;
}
const ProductPage: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, ProductActionTypes | ReviewActionTypes | CartActionTypes>>();
    const product = useSelector((state: RootState) => state.product.storeProduct) as CartItem;
    const productShopData = useSelector((state: RootState) => state.product.productShopData);
    const shopFormErrors = useSelector((state: RootState) => state.product.shopFormErrors);
    const reviews = useSelector((state: RootState) => state.review.productReviews);
    const reviewsSummary = useSelector((state: RootState) => state.review.reviewsSummary);
    const reviewFormData = useSelector((state: RootState) => state.review.reviewFormData);
    const reviewFormErrors = useSelector((state: RootState) => state.review.reviewFormErrors);
    const isLoading = useSelector((state: RootState) => state.product.isLoading);
    const itemInCart = useSelector((state: RootState) => state.cart.cartItems.find(item => item._id === state.product.storeProduct._id) ? true : false);


    const match = useParams<{ slug: string }>();
    const slug = match.slug;

    const prevSlugRef = useRef<string>();
    useEffect(() => {
        prevSlugRef.current = slug;
    }, [slug]);

    useEffect(() => {
        if (slug) {
            dispatch(fetchStoreProduct(slug));
            dispatch(fetchProductReviews(slug));
            document.body.classList.add('product-page');
        }

        return () => {
            document.body.classList.remove('product-page');
        };
    }, [slug]);

    useEffect(() => {
        // Get the previous slug
        if (slug) {
            const prevSlug = prevSlugRef.current;

            if (prevSlug !== slug) {
                dispatch(fetchStoreProduct(slug));
            }
        }
    }, [slug]);

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    // const                        reviewChange={reviewChange}
    // addReview={addProductReview}
    const handleReviewChange = (name: string, value: string | number | boolean | SelectOptionType) => {
        dispatch(reviewChange(name, value));
    }

    const handleAddProductReview = () => {
        dispatch(addProductReview());
    }



    return (
        <div className='product-shop'>
            {isLoading ? (
                <LoadingIndicator />
            ) : Object.keys(product).length > 0 ? (
                <>
                    <Row className='flex-row'>
                        <Col xs='12' md='5' lg='5' className='mb-3 px-3 px-md-2'>
                            <div className='position-relative'>
                                <img
                                    className='item-image'
                                    src={`${product.imageUrl ? product.imageUrl : '/images/placeholder-image.png'}`}
                                />
                                {product.inventory && product.inventory <= 0 && !hasQuantityError(shopFormErrors) ? (
                                    <p className='stock out-of-stock'>Out of stock</p>
                                ) : (
                                    <p className='stock in-stock'>In stock</p>
                                )}                            </div>
                        </Col>
                        <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
                            <div className='product-container'>
                                <div className='item-box'>
                                    <div className='item-details'>
                                        <h1 className='item-name one-line-ellipsis'>{product.name}</h1>
                                        <p className='sku'>{product.sku}</p>
                                        <hr />
                                        {product.brand && (
                                            <p className='by'>
                                                see more from{' '}
                                                <Link to={`/shop/brand/${product.brand.slug}`} className='default-link'>
                                                    {product.brand.name}
                                                </Link>
                                            </p>
                                        )}
                                        <p className='item-desc'>{product.description}</p>
                                        <p className='price'>₹{product.price}</p>
                                    </div>
                                    <div className='item-customize'>
                                        <Input
                                            type={'number'}
                                            // error={shopFormErrors['quantity'][0]}


                                            label={'Quantity'}
                                            name={'quantity'}
                                            decimals={false}
                                            min={1}
                                            max={product.inventory}
                                            placeholder={'Product Quantity'}
                                            disabled={!!(product.inventory && product.inventory <= 0 && (!hasQuantityError(shopFormErrors) || !shopFormErrors.quantity))}
                                            value={productShopData.quantity.toString()}
                                            onInputChange={(name, value) => {
                                                dispatch(productShopChange(name, value));
                                            }}
                                        />
                                        <div onClick={() => console.log(productShopData)}>productShopData</div>
                                    </div>
                                    <div className='my-4 item-share'>
                                        <SocialShare product={product} />
                                    </div>
                                    <div className='item-actions'>
                                        {itemInCart ? (
                                            <Button
                                                variant='primary'
                                                disabled={!!(product.inventory && product.inventory <= 0 && (!hasQuantityError(shopFormErrors) || !shopFormErrors.quantity))}
                                                text='Remove From Bag'
                                                className='bag-btn'
                                                icon={<BagIcon />}
                                                onClick={() => dispatch(handleRemoveFromCart(product))}
                                            />
                                        ) : (
                                            <Button
                                                variant='primary'
                                                disabled={!!(product.inventory && product.inventory <= 0 && (!hasQuantityError(shopFormErrors) || !shopFormErrors.quantity))}
                                                text='Add To Bag'
                                                className='bag-btn'
                                                icon={<BagIcon />}
                                                onClick={() => dispatch(handleAddProductToCart(product))}
                                            />
                                        )}
                                    </div>
                                    <Button
                                        variant="primary"
                                        text="clear cart"
                                        onClick={handleClearCart}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <p onClick={() => { console.log(reviewFormData) }}>Hi there</p>
                    <ProductReviews
                        reviewFormData={reviewFormData}
                        reviewFormErrors={reviewFormErrors}
                        reviews={reviews}
                        reviewsSummary={reviewsSummary}
                        reviewChange={handleReviewChange}
                        addReview={handleAddProductReview}
                    />
                </>
            ) : (
                <NotFound message='No product found.' />
            )}
        </div>
    );
};


export default ProductPage;