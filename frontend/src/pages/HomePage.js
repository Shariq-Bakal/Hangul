import React from 'react'
import Layout from '../components/Layout'
import { useEffect } from 'react'

const HomePage = () => {
  const fetchProducts = async ()=>{
    const response = await fetch("/api/products");
    const data = response.json() 
    console.log(data)

  }
  useEffect(()=>{
    
    fetchProducts()
  },[])

  return (
    <Layout>
        <div>HomePage</div>


    </Layout>
  
  )
}

export default HomePage