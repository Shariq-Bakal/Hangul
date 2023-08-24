import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';

const SingleProductPage = () => {
    const {id} = useParams();
    const {dispatchProduct , productState : {singleProduct} } = useProducts();

    const getSingleProduct = async () => {
        const res = await fetch(`/api/products/${id}`)
        const singleProd = await res.json()
        dispatchProduct({type: "GET_SINGLE_PRODUCT", payload : singleProd })
    }

    useEffect(() => {
        getSingleProduct();
    },[])

    const addToCart = async () => {
        console.log(singleProduct)
        try {
          const res = await fetch(`/api/cart/${singleProduct._id}` , {method : "POST", headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({singleProduct})});
          const data = await res.json();
          console.log(data)
        } catch(error){
          console.log(error)
        }
      }
      //adding to wishlist
    
      const addToWishlist= async()=>{
        try{
          const res = await fetch(`/api/wishlist/${singleProduct._id}`,{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({singleProduct})
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
        <div className='single-product p-2 m-2'>
            <div>
                <img className='product-img' src = {"../"+singleProduct?.productImg} height= "500px" width="500px" alt = "product_image"/>
            </div>
            <div className='m-2'>
            <h4>{singleProduct?.productName}</h4>
                <p className='p-2 price'>Price : <span className='actual-price'>{singleProduct?.productPrice}</span><span className='p-2'>{singleProduct?.productDiscountPrice}</span></p>
                <p> <h5 className='description'>Description :</h5> {singleProduct?.productDescription}</p>
                <button type="button" onClick={ () => addToCart()} className="btn btn-dark m-2">Add to cart</button> <br/>
                <button type="button"  onClick={()=>addToWishlist()} className="btn btn-secondary">Add to wishlist</button>
            </div>
        </div>
       </Layout>
    );
}

export default SingleProductPage;
