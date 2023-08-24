import React from 'react'
import Layout from '../components/Layout'
import { useEffect } from 'react'
import { useProducts } from '../contexts/ProductContext'

const HomePage = () => {

  const {dispatchProduct , productState} = useProducts();
  const {products} = productState;

  const fetchProducts = async () => {
    try{
      const response = await fetch("/api/products");
      const data = await response.json()
      dispatchProduct({type: "GET_PRODUCTS" , payload  : data?.products})
    } catch(error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchProducts();
  },[])

  const addToCart = async (product) => {
    console.log(product)
    try {
      const res = await fetch(`/api/cart/${product._id}` , {method : "POST", headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({product})});
      const data = await res.json();
      console.log(data)
    } catch(error){
      console.log(error)
    }
  }
  //adding to wishlist

  const addToWishlist= async(product)=>{
    try{
      const res = await fetch(`/api/wishlist/${product._id}`,{
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({product})
      })
      const data = await res.json()
      console.log(data)
      

    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className='product-container'>
      {products?.map((product) => <div key={product?._id} className='m-2'>
        <img src= {product?.productImg} className="img-fluid" alt= {product?.productName} />
          <h4 className='p-2'>{product?.productName}</h4>
          <p className='p-2'>Price : {product?.productPrice}</p>
          <button onClick={ () => addToCart(product)}>Add to cart</button> <br/>
          <button onClick={()=>addToWishlist(product)}>Add to wishlist</button>
        </div>)}
      </div>
</Layout> )
}

export default HomePage