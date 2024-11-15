import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

import RangeSlider from '../../Common/RangeSlider';
import { useDispatch } from 'react-redux';
import { filterProducts } from '../../../containers/Product/actions';
import { RootState } from '../../../reducer';
import { ProductActionTypes } from '../../../containers/Product/interface';
import { ThunkDispatch } from 'redux-thunk';
const priceMarks: Record<number, React.ReactNode> = {
    1: <p className='fw-normal text-black'>₹1</p>,
    5000: <p className='fw-normal text-black'>₹5000</p>
};

const rateMarks: Record<number, React.ReactNode> = {
    0: (
        <span>
            <span className='mr-1'>5</span>
            <i
                className='fa fa-star fa-1x'
                style={{ display: 'contents' }}
                aria-hidden='true'
            ></i>
        </span>
    ),
    20: (
        <span>
            <span className='mr-1'>4</span>
            <i className='fa fa-star fa-1x' aria-hidden='true'></i>
        </span>
    ),
    40: (
        <span>
            <span className='mr-1'>3</span>
            <i className='fa fa-star fa-1x' aria-hidden='true'></i>
        </span>
    ),
    60: (
        <span>
            <span className='mr-1'>2</span>
            <i className='fa fa-star fa-1x' aria-hidden='true'></i>
        </span>
    ),
    80: (
        <span>
            <span className='mr-1'>1</span>
            <i className='fa fa-star fa-1x' aria-hidden='true'></i>
        </span>
    ),
    100: <span>Any</span>,
};

const rating = (v: number) => {
    switch (v) {
        case 100:
            return 0;
        case 80:
            return 1;
        case 60:
            return 2;
        case 40:
            return 3;
        case 20:
            return 4;
        default:
            return 5;
    }
};

// interface ProductFilterProps {
//     filterProducts: (type: string, value: number) => void;
// }

const ProductFilter: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, ProductActionTypes>>();


    return (
        <div className='product-filter'>
            <Card className='mb-4'>
                <CardHeader tag='h3'>Price</CardHeader>
                <CardBody>
                    <div className='mx-2 mb-3'>
                        <RangeSlider
                            marks={priceMarks}
                            defaultValue={[1, 2500]}
                            max={5000}
                            onChange={(v: number[] | number) => {
                                console.log(v, "v is here")
                                dispatch(filterProducts('price', v))
                                // if (Array.isArray(v)) {
                                // } else {
                                //     dispatch(filterProducts('price', v))
                                // }
                                // filterProducts('price', v[0]);
                            }}
                        />
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardHeader tag='h3'>Rating</CardHeader>
                <CardBody>
                    <div className='mx-2 mb-4'>
                        <RangeSlider
                            type='slider'
                            marks={rateMarks}
                            step={20}
                            defaultValue={[100]}
                            onChange={(v: number[] | number) => {
                                if (Array.isArray(v)) {
                                    filterProducts('rating', rating(v[0]));
                                }
                                // filterProducts('rating', rating(v[0]));
                            }}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProductFilter;