import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeout, authUserSaga, authCheckStateSaga } from './authSaga';
import { initIngrdientsSaga } from './burgerBuilderSaga';
import { purchaseStartSaga, fetchOrdersSaga } from './ordersSaga';

export function* watchAuth () {
    yield all([
            takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
            takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeout),
            takeEvery(actionTypes.AUTH_USER, authUserSaga),
            takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),  
    ]);  
}

export function* watchBurgerBuilder () {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngrdientsSaga); 
}

export function* watchOrder() {
    yield takeLatest(actionTypes.PURCHASE_START_INIT, purchaseStartSaga);
    yield takeEvery(actionTypes.FETCH_ORDER_INIT, fetchOrdersSaga);
}