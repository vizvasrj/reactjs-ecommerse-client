import {
    FETCH_ORDERS,
    FETCH_SEARCHED_ORDERS,
    FETCH_ORDER,
    UPDATE_ORDER_STATUS,
    SET_ORDERS_LOADING,
    SET_ADVANCED_FILTERS,
    CLEAR_ORDERS,
    SET_SELECTED_ADDRESS,
    SET_CART_ID_FOR_ORDER_TO_PLACE
} from './constants';
import { Product } from '../Product/interface';
import { Address } from '../Address/interface';
// import { Order } from './interface';
// import { OrderStatus } from './interface';
import { Order, OrderProduct } from './interface';
// interface Order {
//     _id: string;
//     cartId: string;
//     products: Product[];
//     totalTax: number;
//     total: number;
//     status: string;
// }

export interface AdvancedFilters {
    totalPages: number;
    currentPage: number;
    count: number;
}

interface State {
    orders: Order[];
    searchedOrders: Order[];
    order: Order;
    isLoading: boolean;
    advancedFilters: AdvancedFilters;
    selectedAddress: Address;
    cartId?: string;
}

const initialState: State = {
    orders: [] as Order[],
    searchedOrders: [] as Order[],
    order: {} as Order,
    isLoading: false,
    advancedFilters: {
        totalPages: 1,
        currentPage: 1,
        count: 0
    },
    selectedAddress: {} as Address,
};

const orderReducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case FETCH_ORDERS:
            return {
                ...state,
                orders: action.payload
            };
        case FETCH_SEARCHED_ORDERS:
            return {
                ...state,
                searchedOrders: action.payload
            };
        case FETCH_ORDER:
            return {
                ...state,
                order: action.payload
            };
        case SET_ADVANCED_FILTERS:
            return {
                ...state,
                advancedFilters: {
                    ...state.advancedFilters,
                    ...action.payload
                }
            };
        case UPDATE_ORDER_STATUS:
            const itemIndex = state.order.products.findIndex(
                (item: OrderProduct) => item.product._id === action.payload.itemId
            );

            const newProducts = [...state.order.products];
            newProducts[itemIndex].status = action.payload.status;
            return {
                ...state,
                order: {
                    ...state.order,
                    products: newProducts
                }
            };
        case SET_ORDERS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case CLEAR_ORDERS:
            return {
                ...state,
                orders: []
            };

        case SET_SELECTED_ADDRESS:
            return {
                ...state,
                selectedAddress: action.payload
            };
        case SET_CART_ID_FOR_ORDER_TO_PLACE:
            return {
                ...state,
                cartId: action.payload
            };
        default:
            return state;
    }
};

export default orderReducer;