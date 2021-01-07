import * as actionTypes from './actionTypes';

export const purchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        error: error
    };
}

export const purchaseBurger = () => {
    return {
        type: actionTypes.PURCHASE_START
    };
}

export const purchaseStart = (orderData, token) => {
    return {
        type: actionTypes.PURCHASE_START_INIT,
        orderData: orderData,
        token: token
    };
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders:orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error:error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    };
};

export const fetchOrders = (token, userId) => {
   return {
       type: actionTypes.FETCH_ORDER_INIT,
       token: token,
       userId: userId
    };
};