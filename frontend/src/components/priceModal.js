import React from 'react'
import { useProducts } from '../contexts/ProductContext'

const PriceModal = () => {
    const {productState : {cart}} = useProducts()
  return (
    <section className='price-modal p-3'>
        <p>Price Details ({cart?.length} items)</p>
        <section className='flex'>
            <span>Total MRP</span>
            <span> Rs 1000</span>
        </section>
        <section className='flex'>
            <span>Discounted Price </span>
            <span> Rs 500</span>
        </section>
        <section className='flex'>
            <span>Delivery Charges</span>
            <span>Rs. 99</span>
        </section>
        <section className='flex'>
        <span>Total Amount</span>
            <span>Rs. 1199</span>
        </section>
        
        <button type="button" className="btn btn-dark checkout-btn">Proceed To Checkout</button> 
    </section>
  )
}

export default PriceModal