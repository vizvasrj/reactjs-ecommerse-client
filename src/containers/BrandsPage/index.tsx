import React from 'react';
import BrandList from '../../components/Store/BrandList';
import { fetchStoreBrands } from '../Brand/actions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { BrandActionTypes } from '../Brand/actions';
import { Brand } from '../Brand/interface';

const BrandsPage = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, BrandActionTypes>>();
    const brands = useSelector((state: RootState) => state.brand.storeBrands) as Brand[];
    React.useEffect(() => {
        dispatch(fetchStoreBrands());
    }, [fetchStoreBrands]);

    return (
        <div className='brands-page'>
            <BrandList brands={brands} />
        </div>
    );
}

export default BrandsPage;