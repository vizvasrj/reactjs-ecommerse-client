import React, { Component, ChangeEvent, useEffect } from 'react';
import { connect } from 'react-redux';
// import actions from '../../actions';
import { ROLES } from '../../constants';
import SubPage from '../../components/Manager/SubPage';
import OrderList from '../../components/Manager/OrderList';
import OrderSearch from '../../components/Manager/OrderSearch';
import SearchResultMeta from '../../components/Manager/SearchResultMeta';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import Pagination from '../../components/Common/Pagination';
import { fetchAccountOrders, searchOrders } from './actions';
import { RootState } from '../../reducer';
import { ThunkDispatch } from 'redux-thunk';
import { OrderActionTypes } from './interface';

import { useDispatch, useSelector } from 'react-redux';
import { Order } from './interface';
import { navigate, NavigateActionType } from '../Navigate';


// interface ListProps {
//     history: any;
//     user: any;
//     orders: any[];
//     isLoading: boolean;
//     advancedFilters: any;
//     fetchAccountOrders: () => void;
// }

// interface ListState {
//     search: string;
// }

const List: React.FC = () => {
    const [search, setSearch] = React.useState('');
    const dispatch = useDispatch<ThunkDispatch<RootState, null, OrderActionTypes | NavigateActionType>>();
    const orders = useSelector((state: RootState) => state.order.orders) as Order[];
    const searchedOrders = useSelector((state: RootState) => state.order.searchedOrders) as Order[];
    const isLoading = useSelector((state: RootState) => state.order.isLoading) as boolean;
    const advancedFilters = useSelector((state: RootState) => state.order.advancedFilters);
    const { user } = useSelector((state: RootState) => state.account);

    useEffect(() => {
        dispatch(fetchAccountOrders());
    }, [fetchAccountOrders])

    const handleOrderSearch = (e: { value: string }) => {
        if (e.value.length >= 2) {
            // dispatch(fetchAccountOrders(e.value));
            setSearch(e.value);
        } else {
            setSearch('');
        }
    }

    const handleOnPagination = (n: string, v: number) => {
        dispatch(fetchAccountOrders(v));
    };

    const isSearch = search.length > 0;
    const filteredOrders = search
        ? searchedOrders
        : orders;

    const displayPagination = advancedFilters.totalPages > 1;

    const displayOrders = filteredOrders && filteredOrders.length > 0;

    const handleSearchOrders = () => {
        dispatch(searchOrders({ value: search }));
    }

    return (
        <div className='order-dashboard'>

            <SubPage
                title='Your Orders'
                actionTitle={user.role === ROLES.Admin && 'Customer Orders' || "actionTitle is empty"}
                handleAction={() =>
                    user.role === ROLES.Admin &&
                    // history.push('/dashboard/orders/customers')
                    dispatch(navigate("/dashboard/orders/customers"))
                }
            >
                <OrderSearch
                    // onBlur={this.handleOrderSearch}
                    onSearch={handleOrderSearch}
                    onSearchSubmit={handleSearchOrders}
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
                    <NotFound message='You have no orders yet.' />
                )}
            </SubPage>
        </div>
    );
}


export default List;