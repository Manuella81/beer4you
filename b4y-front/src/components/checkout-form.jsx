import React, {useState, useEffect} from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {checkPayment, updateOrder} from '../api/order'
import {Navigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux' 
import {selectUser} from '../slices/userSlice'
import {selectBasket, modifyBasket, cleanBasket} from '../slices/basketSlice'


const CheckoutForm = (props) =>{
    
    
    const [error, setError] = useState(false)
    const [redirectSuccess, setRedirectSuccess] = useState(false)
    const basket = useSelector(selectBasket)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    
    const stripe = useStripe();
    const elements = useElements();
    
    //fonction de paiement lors de la validation de la CB
    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log("coucou CB")
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          setError("Problème avec le terminal de paiement")
          return;
        }
        
        let data = {
            email: user.infos.email,
            orderId: props.orderId
        }
        
        //gestion du paiement via stripe
        //on va checker via stripe dans le back end si le paiement est réalisable
        const paymentAuth = await checkPayment(data)
        //si jamais le paiement ne passe pas
        if(paymentAuth.status === 500){
            setError("Echec du check de paiement")
        }
        
        //on stock la réponse de la tentative de paiement vers stripe dans la variable secret qui retourne une clé sécurisé
        const secret = paymentAuth.client_secret
        console.log("client_secret", secret)
        //on balance l'envoi du paiement
        const payment = await stripe.confirmCardPayment(secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email: user.infos.email
                }
            }
        })
        //payment va renvoyer la réponse (succés ou echec de paiement)
         console.log(payment)
        //gestion des erreurs
        if(payment.error){
            setError("Echec de la tentative de paiement de votre CB")
        } else {
            //si le paiement est réussi
            if(payment.paymentIntent.status === "succeeded") {
                console.log("Money is in the bank")
                
                let data = {
                    orderId: props.orderId,
                    status: "payed"
                }
                //on enregistre dans la bdd que le status de la commande est payée
                updateOrder(data)
                .then((res)=>{
                    setRedirectSuccess(true)
                })
                .catch(err=>console.log(err))
            }
        }
       
    }
    

    if(redirectSuccess){
        return <Navigate to="/success" />
    }
    return (
        <section>
            {error !== null && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                        base: {
                          color: "#32325d",
                          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                          fontSmoothing: "antialiased",
                          fontSize: "16px",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#fa755a",
                          iconColor: "#fa755a",
                        },
                      },
                    }}
                        
                />
                <button
                    disabled={props.stripe}
                >Payer</button>
            </form>
        </section>
    ) 
}

export default CheckoutForm