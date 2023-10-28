import React from 'react'
import { useAuth } from '../contexts/AuthContext';

const PayButton = ({cart}) => {
    const { authState : {loggedInUser}} = useAuth();
    const url = "http://localhost:5051/api"

const handleCheckout = async () => {
    try {
        const res = await fetch(`${url}/Stripe/create-checkout-session` , {
            method: "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({cart ,  userId : loggedInUser.id })
        });
        const data = await res.json();
        if(data.url) {
            window.location.href = data.url
        }
    } catch(error) {
        console.log(error.message)
    }

}
  return (
    <button type = "button" className="btn btn-dark checkout-btn" onClick = {() => handleCheckout()}>Checkout</button>
  )
}

export default PayButton