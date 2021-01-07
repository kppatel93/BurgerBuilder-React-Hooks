import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/actionIndex';


export function* purchaseStartSaga(action) {
    yield put(actions.purchaseBurger());
    try {
            const response = yield axios.post( '/orders.json?auth=' + action.token, action.orderData );
            yield put(actions.purchaseSuccess(response.data.name, action.orderData));
        }
    catch(error) {
            yield put(actions.purchaseFail(error));
    }    
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
        try {
            const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
            const response = yield axios.get('/orders.json' + queryParams);
            const fetchedOrders = [];
            for(let key in response.data){
                fetchedOrders.push({
                ...response.data[key],
                id: key
                });
            }
            yield put(actions.fetchOrdersSuccess(fetchedOrders));      
        }
        catch(error) {
            yield put(actions.fetchOrdersFail(error));
        }
}