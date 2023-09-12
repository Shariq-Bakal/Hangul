import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useProducts } from '../contexts/ProductContext'

const AccountPage = () => {    

    const {dispatchProduct , productState : {orders}} = useProducts()
    
    const getOrders = async () => {
    try { 
      const res = await fetch("/api/orders");
      const data = await res.json();
      var allOrders = []
     data?.orders?.map((item) => item?.orders.map((sub) => allOrders.push(sub)))
      dispatchProduct({type : "GET_ORDERS" , payload : allOrders })
    } catch(e) {
    }
  }

    useEffect(() => {
        getOrders();
    },[])

  return (
    <Layout>
            <div className='product-container '>
            <section>
            {orders?.map(product=><div key={product?._id} className='m-2 cart-card'>
            <div>
                <img src= {product?.productImg} className="img-fluid cart-img" alt= {product?.productName} />
            </div>
            <section className='p-2'>
            <h4 >{product?.productName}</h4>
              <p >Price : <span className='actual-price'>{product?.productPrice}</span><span className='p-2'>{product?.productDiscountPrice}</span></p>
              {/* <button type="button" onClick={ () => removeFromCart(product)} className="btn btn-dark m-2">Remove from Cart</button>  */}
              {/* <button className='btn btn-secondary m-2'>Add to Wishlist</button> */}
            </section>
<br/>
            </div>)} 
            </section>
        </div>
        
    </Layout>
  )
}

export default AccountPage