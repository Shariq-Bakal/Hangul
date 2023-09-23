import React from 'react'
import { useProducts } from '../contexts/ProductContext'
import PayButton from './PayButton';

const PriceModal = () => {
const {productState : {cart} , dispatchProduct} = useProducts();
const deliveryCharges = 99 * cart.length;

var totalCartPrice = 0;
var totalDiscountedCartPrice = 0

for(let i =0; i < cart.length; i++) {
    totalCartPrice = Number(totalCartPrice )+ Number(cart[i].productPrice);
    totalDiscountedCartPrice = Number(totalDiscountedCartPrice) + Number(cart[i].productDiscountPrice)
}

const placeOrder = async () => {
    try {
        const res = await fetch(`/api/orders` , {method : "POST", headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({orders : cart})});
        const data = await res.json();
        console.log(data)
        dispatchProduct({type : "SET_ORDERS" , payload : data?.currentOrders })
    } catch(e) {
        console.log(e)
    }
}
  return (
    <section className='price-modal p-3'>
        <p>Price Details ({cart?.length} items)</p>
        <section className='flex-sb'>
            <span>Total MRP</span>
            <span> Rs {totalCartPrice}</span>
        </section>
        <section className='flex-sb'>
            <span>Discounted Price </span>
            <span> Rs {totalDiscountedCartPrice}</span>
        </section>
        <section className='flex-sb'>
            <span>Delivery Charges</span>
            <span>Rs. {deliveryCharges}</span>
        </section>
        <section className='flex-sb'>
        <span>Total Amount</span>
            <span>Rs. {totalDiscountedCartPrice + deliveryCharges}</span>
        </section>
        <PayButton cart = {cart} />
        
        {/* <button type="button" className="btn btn-dark checkout-btn" onClick={() => placeOrder()}>Proceed To Checkout</button>  */}
    </section>
  )
}

export default PriceModal