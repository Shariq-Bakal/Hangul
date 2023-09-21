import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import PriceModal from '../components/priceModal';
import { useProducts } from '../contexts/ProductContext';


const CartPage = () => {
    const {productState:{cart},dispatchProduct} = useProducts()

    const getCartProducts = async ()=>{
        const res = await fetch("/api/cart");
        const data = await res.json();
        dispatchProduct({type:"GET_CART_PRODUCTS",payload:data?.cartProducts})
    }

    useEffect(()=>{
        getCartProducts();
    },[])

    const removeFromCart= async (product)=>{
        const res = await fetch(`/api/cart/${product._id}`,{
            method:"DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({product})
        });
        const data = await res.json();
        dispatchProduct({type:"DELETE_CART_PRODUCTS",payload:data?.product})
    }
    
    return (
       <Layout>
        <h4 className='heading m-4'>My Cart ({cart?.length})</h4>
         <div className='product-container '>
            <section>
            {cart?.map(product=><div key={product?._id} className='m-2 cart-card'>
            <div>
                <img src= {product?.productImg} className="img-fluid cart-img" alt= {product?.productName} />
            </div>
            <section className='p-2'>
            <h4 >{product?.productName}</h4>
              <p >Price : <span className='actual-price'>{product?.productPrice}</span><span className='p-2'>{product?.productDiscountPrice}</span></p>
              <button type="button" onClick={ () => removeFromCart(product)} className="btn btn-dark m-2">Remove from Cart</button> 
              <button className='btn btn-secondary m-2'>Add to Wishlist</button>
            </section>
<br/>
            </div>)} 
            </section>
          { cart.length > 0 && <PriceModal />}

        </div>
       </Layout>
    );
}

export default CartPage;
