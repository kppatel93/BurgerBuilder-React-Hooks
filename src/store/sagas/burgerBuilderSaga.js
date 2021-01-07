import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/actionIndex';

export function* initIngrdientsSaga(action) {
    try {
        const response = yield axios.get('https://kpburger-builder-default-rtdb.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(response.data));
    }
    catch(error) {
        yield put(actions.fetchError());
    }
}