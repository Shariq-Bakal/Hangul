import React from 'react'
import Layout from '../components/Layout'
import { useEffect } from 'react'
import { useProducts } from '../contexts/ProductContext'

const HomePage = () => {
  const {productState,dispatchProduct} = useProducts();
 
  useEffect(()=>{
    const fetchProducts = async ()=>{
      const response = await fetch("/api/products");
      const data = await response.json() 
      dispatchProduct({type:"GET_PRODUCTS",payload:data})
      console.log(data)
      
    
    }
    
    fetchProducts()
  },[dispatchProduct])
  

 

  return (
    <Layout>
      <h1>Products</h1> <br/>
      {
        productState.products.map(product=>{
          return <div className='product-container'>
            <img src={product.productImg} height="300" width="300"/> <br/>
            <span>{product.productName}</span>

            <span>{product.productDescription}</span> <br/>
            
            </div>
        })
      }
        
        

    </Layout>
  
  )
}

export default HomePage