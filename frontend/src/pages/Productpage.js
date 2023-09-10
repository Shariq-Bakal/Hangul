import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useProducts } from '../contexts/ProductContext';
import { useNavigate } from 'react-router-dom';

const Productpage = () => {
    const {dispatchProduct , productState} = useProducts();

    const {products} = productState;
    const navigate = useNavigate();
  
    const fetchProducts = async () => {
      try{
        const response = await fetch("/api/products");
        const data = await response.json()
        dispatchProduct({type: "GET_PRODUCTS" , payload  : data?.products})
      } catch(error) {
        console.log(error)
      }
    }

    // const getOrders = async () => {
    //   try { 
    //     const res = await fetch("/api/orders");
    //     const data = await res.json();
    //     var arr = []
    //    data?.orders?.map((item) => item?.orders.map((sub) => arr.push(sub)))
    //     console.log(arr)
    //   } catch(e) {

    //   }
    // }

    useEffect(()=>{
        fetchProducts();
        // getOrders();
      },[])
    
      const getSingleProduct = async (product) => {
        try{
          navigate(`/products/${product._id}`)
          const res = await fetch(`/api/products/${product._id}`);
          const singleProduct = await res.json();
          console.log(singleProduct)
        } catch(error) {
          console.log(error)
        }
      }
    return (
        <Layout>
        <div className='product-container'>
        {products?.map((product) => <div key={product?._id} className='m-2 product-card' onClick={() => getSingleProduct(product)}>
          <img src= {product?.productImg} className="img-fluid" alt= {product?.productName} />
            <h4 className='p-2'>{product?.productName}</h4>
            <p className='p-2'>Price : <span className='actual-price'>{product?.productPrice}</span><span className='p-2'>{product?.productDiscountPrice}</span></p>
          </div>)}
        </div>
  </Layout> 
       
    );
}

export default Productpage;
