/**
 *
 * Shop
 *
 */

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import { sortOptions } from '../../utils/store';

import ProductsShop from '../ProductsShop';
import BrandsShop from '../BrandsShop';
import CategoryShop from '../CategoryShop';

import Page404 from '../../components/Common/Page404';
import ProductFilter from '../../components/Store/ProductFilter';
import Pagination from '../../components/Common/Pagination';
import SelectOption from '../../components/Common/SelectOption';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { ProductActionTypes } from '../Product/interface';
import { filterProducts, fetchProducts } from '../Product/actions';
import { ThunkDispatch } from 'redux-thunk';


const Shop: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, any, ProductActionTypes>>();

    const { products, advancedFilters } = useSelector((state: RootState) => state.product);

    useEffect(() => {
        // dispatch(fetchProducts());
        document.body.classList.add('shop-page');
        return () => {
            document.body.classList.remove('shop-page');
        }
    }, []);

    const { totalPages, currentPage, count, limit, order } = advancedFilters;
    const displayPagination = totalPages > 1;
    const totalProducts = products.length;
    const left = limit * (currentPage - 1) + 1;
    const right = totalProducts + left - 1;

    const handleFilterProducts = (key: string, value: any) => {
        dispatch(filterProducts(key, value));
    }

    return (
        <div className='shop'>
            <Row xs='12'>
                <Col
                    xs={{ size: 12, order: 1 }}
                    sm={{ size: 12, order: 1 }}
                    md={{ size: 12, order: 1 }}
                    lg={{ size: 3, order: 1 }}
                >
                    <ProductFilter />
                </Col>
                <Col
                    xs={{ size: 12, order: 2 }}
                    sm={{ size: 12, order: 2 }}
                    md={{ size: 12, order: 2 }}
                    lg={{ size: 9, order: 2 }}
                >
                    <Row className='align-items-center mx-0 mb-4 mt-4 mt-lg-0 py-3 py-lg-0 bg-white shop-toolbar'>
                        <Col
                            xs={{ size: 12, order: 1 }}
                            sm={{ size: 12, order: 1 }}
                            md={{ size: 5, order: 1 }}
                            lg={{ size: 6, order: 1 }}
                            className='text-center text-md-left mt-3 mt-md-0 mb-1 mb-md-0'
                        >
                            <span>Showing: </span>
                            {totalProducts > 0
                                ? `${left}-${right} products of ${count} products`
                                : `${count} products`}
                        </Col>
                        <Col
                            xs={{ size: 12, order: 2 }}
                            sm={{ size: 12, order: 2 }}
                            md={{ size: 2, order: 2 }}
                            lg={{ size: 2, order: 2 }}
                            className='text-right pr-0 d-none d-md-block'
                        >
                            <span>Sort by</span>
                        </Col>
                        <Col
                            xs={{ size: 12, order: 2 }}
                            sm={{ size: 12, order: 2 }}
                            md={{ size: 5, order: 2 }}
                            lg={{ size: 4, order: 2 }}
                        >
                            <SelectOption
                                // name={'sorting'}
                                value={{ value: order, label: sortOptions[order].label }}
                                options={sortOptions}
                                handleSelectChange={(value: { value: any; label: string }[] | { value: any; label: string }) => {
                                    if (Array.isArray(value)) {
                                        dispatch(filterProducts('sorting', value[0].value));
                                    } else {
                                        dispatch(filterProducts('sorting', value.value));
                                    }

                                }}
                            />
                        </Col>
                    </Row>
                    <Routes>
                        <Route path='/' element={<ProductsShop />} />
                        <Route path='/category/:slug' element={<CategoryShop />} />
                        <Route path='/brand/:slug' element={<BrandsShop />} />
                        <Route path='*' element={<Page404 />} />
                    </Routes>

                    {displayPagination && (
                        <div className='d-flex justify-content-center text-center mt-4'>
                            <Pagination totalPages={totalPages} onPagination={handleFilterProducts} />
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );

}



export default Shop;
