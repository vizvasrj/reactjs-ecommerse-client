import React from 'react';
import { connect } from 'react-redux';
import { ROLES } from '../../constants';
import SubPage from '../../components/Manager/SubPage';
import MerchantList from '../../components/Manager/MerchantList';
import MerchantSearch from '../../components/Manager/MerchantSearch';
import SearchResultMeta from '../../components/Manager/SearchResultMeta';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import Pagination from '../../components/Common/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMerchants, searchMerchants } from './actions';
import { RootState } from '../../reducer';
// import { useNavigate } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { MerchantActionTypes } from './interface';
import { approveMerchant, rejectMerchant, deleteMerchant, disableMerchant } from './actions';
import { navigate, NavigateActionType } from '../Navigate';

const List: React.FC = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch<ThunkDispatch<RootState, null, MerchantActionTypes | NavigateActionType>>();

    React.useEffect(() => {
        dispatch(fetchMerchants());
    }, [dispatch]);

    const [search, setSearch] = React.useState('');


    const handleMerchantSearch = (e: { value: string }) => {
        if (e.value.length >= 2) {
            dispatch(searchMerchants({ name: 'merchant', value: e.value }));
            setSearch(e.value);
        } else {
            setSearch('');
        }
    };


    const handleOnPagination = (n: string, v: any) => {
        dispatch(fetchMerchants(v));
    }
    const handleOnSearchSubmit = () => {
        dispatch(searchMerchants({ name: 'merchant', value: search }));
    }
    const { user } = useSelector((state: RootState) => state.account);
    const { merchants, searchedMerchants, advancedFilters, isLoading } = useSelector((state: RootState) => state.merchant);

    const isSearch = search.length > 0;
    const filteredMerchants = search ? searchedMerchants : merchants;
    const displayPagination = advancedFilters.totalPages > 1;
    const displayMerchants = filteredMerchants && filteredMerchants.length > 0;

    return (
        <div className='merchant-dashboard'>
            <SubPage
                title={'Merchants'}
                actionTitle={user.role === ROLES.Admin && 'Add' || ''}
                handleAction={() => navigate('/dashboard/merchant/add')}
            />
            <MerchantSearch
                onSearch={handleMerchantSearch}
                onSearchSubmit={handleOnSearchSubmit}
            />
            {isLoading && <LoadingIndicator />}
            {displayMerchants && (
                <>
                    {!isSearch && displayPagination && (
                        <Pagination
                            totalPages={advancedFilters.totalPages}
                            onPagination={handleOnPagination}
                        />
                    )}
                    <SearchResultMeta
                        label='merchants'
                        count={
                            isSearch ? filteredMerchants.length : advancedFilters.count
                        }
                    />
                    <MerchantList
                        merchants={filteredMerchants}
                        approveMerchant={m =>
                            dispatch(approveMerchant(m, search, advancedFilters.currentPage))
                        }
                        rejectMerchant={m =>
                            dispatch(rejectMerchant(m, search, advancedFilters.currentPage))
                        }
                        deleteMerchant={m =>
                            dispatch(deleteMerchant(m, search, advancedFilters.currentPage))
                        }
                        disableMerchant={(m, v) =>
                            dispatch(disableMerchant(m, v, search, advancedFilters.currentPage))
                        }
                    />
                </>
            )}
            {!isLoading && !displayMerchants && (
                <NotFound message='No merchants found.' />
            )}
        </div>
    );

}


export default List;