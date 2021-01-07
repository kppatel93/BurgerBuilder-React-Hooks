import React, {  } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactInfo from './ContactInfo/ContactInfo';


const Checkout = props => {

    const checkoutCanceled = () => {
        props.history.goBack();
    }

    const checkoutContinued = () => {
        props.history.replace('/checkout/contact-info');
    }

        let summary = <Redirect to='/' />
            if(props.ings) {
            const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null;
            
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={props.ings}
                        checkoutCancel={checkoutCanceled}
                        checkoutContinue={checkoutContinued}/>
                    <Route 
                    path={props.match.path + '/contact-info'} 
                    component={ContactInfo} />
                </div>
            );
        }
        return summary;
    }

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);