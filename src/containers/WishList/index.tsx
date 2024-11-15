import React, { useEffect } from 'react';
import SubPage from '../../components/Manager/SubPage';
import WishList from '../../components/Manager/WishList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducer';
import { updateWishlist, fetchWishlist } from './actions';
import { ThunkDispatch } from 'redux-thunk';
import { WishlistActionTypes } from './interface';



const Wishlist: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, WishlistActionTypes>>();
    const { wishlist, isLoading } = useSelector((state: RootState) => state.wishlist);

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [fetchWishlist, dispatch]);

    const handleUpdateWishlist = (isLiked: boolean, productId: string) => {
        dispatch(updateWishlist(isLiked, productId));
    }


    const displayWishlist = wishlist.length > 0;

    return (
        <div className='wishlist-dashboard'>
            <SubPage title={'Your Wishlist'}
            // isMenuOpen={null}
            >
                {isLoading && <LoadingIndicator />}
                {displayWishlist && (
                    <WishList wishlist={wishlist} updateWishlist={handleUpdateWishlist} />
                )}
                {!isLoading && !displayWishlist && (
                    <NotFound message='You have no items in your wishlist yet.' />
                )}
            </SubPage>
        </div>
    );
};


export default Wishlist;