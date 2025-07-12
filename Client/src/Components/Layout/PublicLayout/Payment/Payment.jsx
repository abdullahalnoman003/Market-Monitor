import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise =  loadStripe('pk_test_51Rk27YHHHezoFEjUZ3FmplfRMgQ2DwYqGEQIjXdOVossUWKIDoI5266wIQRkohZZRxCnCqs2qNb1YNrObaiN7VR400bBc2GFa5')


const Payment = () => {
    return (
       <Elements stripe={stripePromise}>
        <PaymentForm></PaymentForm>
       </Elements>
       
    );
};

export default Payment;