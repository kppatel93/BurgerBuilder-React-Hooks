import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSumamry = props => {
    
        const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}:</span>{props.ingredients[igKey]}
                </li> );
            });

        return ( 
            <Auxiliary>
                <h3>Order Details</h3>
                <p>A delicious Burger with your choice of Ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {'$' + props.price.toFixed(2)}</strong></p>
                <p>Continue To Checkout?</p>
                <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
            </Auxiliary>
        );
    }


export default OrderSumamry;