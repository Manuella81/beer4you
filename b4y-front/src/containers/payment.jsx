import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../components/checkout-form'
import {Elements} from '@stripe/react-stripe-js';

const Payment = (props) =>{
    
    const stripePromise = loadStripe("pk_test_51LKg9SIwRAxdZUWdcLBvvTQNLSzPy9V4w7zV599L2oXU64Mm8IySNyP3fCCW2Km5g9NOWhUGFBdyJFKlt0LsQJ1C00Sf1hsuYd")
    
    return (
        <section id="payment">
            <h2>Payment</h2>
            {/*<p>Id de la commande : {props.params.orderId}</p>*/}
            <Elements stripe={stripePromise}>
              <CheckoutForm orderId={props.params.orderId}/>
            </Elements>
            
            
        </section>
    );
};

export default Payment;