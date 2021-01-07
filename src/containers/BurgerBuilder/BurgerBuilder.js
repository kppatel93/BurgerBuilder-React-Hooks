import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import axios from '../../axios-orders';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/actionIndex';

const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);
    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = ingName => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngrdients()), []);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = path => dispatch(actions.authRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);
    

    const updatePurchaseCount = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }
 
    const purchaseHandler = () => {
        if(isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancel = () => {
       setPurchasing(false);
    }

    const purchaseContinue = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }
    
        const disabledInfo = {
            ...ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0       
         }

         let orderSummary= null;
         let burger = <Spinner />;
         
            if(ings) {
                burger = (
                    <Auxiliary>
                            <Burger ingredients={ings}/>
                            <BuildControls 
                            ingredientAdded= {onIngredientAdded}
                            ingredientRemoved= {onIngredientRemoved}
                            disabled = {disabledInfo}
                            price = {price}
                            purchase = {updatePurchaseCount(ings)}
                            confirmorder = {purchaseHandler}
                            isAuth = {isAuthenticated}
                            />
                    </Auxiliary>
                );
                orderSummary = (
                    <OrderSummary 
                            ingredients={ings}
                            purchaseCancel= {purchaseCancel}
                            purchaseContinue= {purchaseContinue}
                            price={price} />
                );
            }
       
        return (
            <Auxiliary>
                <Modal show={purchasing} modalClosed={purchaseCancel}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    };

export default withErrorHandler(BurgerBuilder, axios);