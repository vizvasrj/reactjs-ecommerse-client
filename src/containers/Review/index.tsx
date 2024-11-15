import React, { useEffect } from 'react';

import SubPage from '../../components/Manager/SubPage';
import ReviewList from '../../components/Manager/ReviewList';
import SearchResultMeta from '../../components/Manager/SearchResultMeta';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import Pagination from '../../components/Common/Pagination';
import { fetchReviews } from './actions';
import { RootState } from '../../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ReviewActionTypes } from './interface';

const Review: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, ReviewActionTypes>>();
    const { reviews, isLoading, advancedFilters } = useSelector((state: RootState) => state.review);

    useEffect(() => {
        dispatch(fetchReviews());
    }, []);

    const handlePagination = (s: string, page: number) => {
        dispatch(fetchReviews(s, page));
    }

    const displayPagination = advancedFilters.totalPages > 1;
    const displayReviews = reviews && reviews.length > 0;

    return (
        <div className='review-dashboard'>
            <SubPage title={'Reviews'}
            //  isMenuOpen={null}
            >
                {isLoading && <LoadingIndicator />}

                {displayPagination && (
                    <Pagination
                        totalPages={advancedFilters.totalPages}
                        onPagination={handlePagination}
                    />
                )}
                {displayReviews && (
                    <>
                        <SearchResultMeta label='reviews' count={advancedFilters.count} />
                        <ReviewList />
                    </>
                )}

                {!isLoading && !displayReviews && (
                    <NotFound message='No reviews found.' />
                )}
            </SubPage>
        </div>
    );
};

export default Review;