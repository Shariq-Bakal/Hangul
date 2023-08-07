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

  return (
    <Layout>
      <div className='product-container'>
      {products?.map(({productName , _id , productPrice , productImg }) => <div key={_id} className='m-2'>
        <img src= {productImg} className="img-fluid" alt= {productName} />
          <h4 className='p-2'>{productName}</h4>
          <p className='p-2'>Price : {productPrice}</p>
        </div>)}
      </div>
</Layout> )

export default HomePage