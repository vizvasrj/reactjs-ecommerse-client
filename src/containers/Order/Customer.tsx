import React, { useEffect, useState } from 'react';
import { ROLES } from '../../constants';
import SubPage from '../../components/Manager/SubPage';
import OrderList from '../../components/Manager/OrderList';
import OrderSearch from '../../components/Manager/OrderSearch';
import SearchResultMeta from '../../components/Manager/SearchResultMeta';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import Pagination from '../../components/Common/Pagination';
import { fetchOrders } from '../../containers/Order/actions';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { OrderActionTypes } from '../../containers/Order/interface';
import { useDispatch, useSelector } from 'react-redux';
import { searchOrders } from '../../containers/Order/actions';
import { navigate, NavigateActionType } from '../Navigate';

const Customer: React.FC = () => {


    const [search, setSearch] = useState<string>('');
    const dispatch = useDispatch<ThunkDispatch<RootState, null, OrderActionTypes | NavigateActionType>>();
    const user = useSelector((state: RootState) => state.account.user);
    const orders = useSelector((state: RootState) => state.order.orders);
    const searchedOrders = useSelector((state: RootState) => state.order.searchedOrders);
    const isLoading = useSelector((state: RootState) => state.order.isLoading);
    const advancedFilters = useSelector((state: RootState) => state.order.advancedFilters);

    const handleOrderSearch = (data: { name: string; value: string }) => {
        if (data.value.length >= 2) {
            dispatch(searchOrders({ value: data.value }));
            setSearch(data.value);
        } else {
            setSearch('');
        }
    }

    const handleSearchOrder = (filter: { value: string }) => {
        dispatch(searchOrders(filter));
    }


    const handleOnPagination = (type: string, page: number) => {
        dispatch(fetchOrders(page));
    }

    useEffect(() => {
        dispatch(fetchOrders());
        return () => {
            dispatch(fetchOrders());
        }
    }, [fetchOrders]);

    const isSearch = search.length > 0;
    const filteredOrders = search ? searchedOrders : orders;
    const displayPagination = advancedFilters.totalPages > 1;
    const displayOrders = filteredOrders && filteredOrders.length > 0;

    return (
        <div className='order-dashboard'>
            <SubPage
                title='Customer Orders'
                actionTitle='My Orders'
                handleAction={() =>
                    user.role === ROLES.Admin && dispatch(navigate('/dashboard/orders'))
                }
            >
                <OrderSearch
                    onSearch={handleOrderSearch}
                    onSearchSubmit={handleSearchOrder}
                />
                {isLoading && <LoadingIndicator />}
                {displayOrders && (
                    <>
                        {!isSearch && displayPagination && (
                            <Pagination
                                totalPages={advancedFilters.totalPages}
                                onPagination={handleOnPagination}
                            />
                        )}

                        <SearchResultMeta
                            label='orders'
                            count={isSearch ? filteredOrders.length : advancedFilters.count}
                        />
                        <OrderList orders={filteredOrders} />
                    </>
                )}
                {!isLoading && !displayOrders && (
                    <NotFound message='No orders found.' />
                )}
            </SubPage>
        </div>
    );
}


export default Customer;