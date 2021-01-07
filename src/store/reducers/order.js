import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders:[],
    loading: false,
    purchased: false
};

const purchaseInit = (state, action) => {
    return updateObject(state, {purchased: false});
};

const loadingInit = (state, action) => {
    return updateObject(state, {loading: true});
};

const loadingStop = (state,action) => {
    return updateObject(state, {loading: false});
};

const purchaseSuccess = (state,action) => {
    const newOrder = updateObject(action.orderData, {id:action.orderId});
            return updateObject(state, { 
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            }); 
};

const fetchOrderSuccess = (state,action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_START: return loadingInit(state, action);  
        case actionTypes.PURCHASE_SUCCESS: return purchaseSuccess(state, action);
        case actionTypes.PURCHASE_FAIL: return loadingStop(state, action);
        case actionTypes.FETCH_ORDER_START: return loadingInit(state, action);
        case actionTypes.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDER_FAIL: return loadingStop(state, action);
        default: return state;
    }
};

export default orderReducer;