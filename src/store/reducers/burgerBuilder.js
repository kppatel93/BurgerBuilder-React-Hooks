import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients:null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.5,
    bacon: 1
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        building: true
    }
        return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIngre = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedIngres = updateObject(state.ingredients, updatedIngre);
            const updatedSta = {
                ingredients: updatedIngres,
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
                building: true
            }
              return updateObject(state, updatedSta);
};

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad : action.ingredients.salad,
            bacon : action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action); 
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action); 
        case actionTypes.SET_INGREDIENT: return setIngredient(state, action);
        case actionTypes.FETCHED_ERROR: return updateObject(state, {error: true});
        default: return state;
    }   
};

export default reducer;