import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';

const SingleProductPage = () => {
    const {id} = useParams();
    const {dispatchProduct , productState : {singleProduct , cart , wishlist , products } } = useProducts();
    const navigate = useNavigate();

    const getSingleProduct = async () => {
        const res = await fetch(`/api/products/${id}`)
        const singleProd = await res.json()
        dispatchProduct({type: "GET_SINGLE_PRODUCT", payload : singleProd?.product})
    }

    const getWishlistProducts = async ()=>{
      const res = await fetch(`/api/wishlist`);
      const data = await res.json();
      dispatchProduct({type:"GET_WISHLIST_PRODUCTS",payload:data.wishlistProducts});
  }

  const getCartProducts = async ()=>{
    const res = await fetch("/api/cart");
    const data = await res.json();
    dispatchProduct({type:"GET_CART_PRODUCTS",payload:data?.cartProducts})
}


    useEffect(() => {
        getSingleProduct();
        getWishlistProducts();
        getCartProducts();
    },[])

    const addToCart = async () => {
        try {
          const res = await fetch(`/api/cart/${singleProduct._id}` , {method : "POST", headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({singleProduct , currentProductPrice : singleProduct.productPrice})});
          const data = await res.json();
          const cartProduct = products.find((item) => item._id === data.productId)
          dispatchProduct({type:"SET_CART_PRODUCTS",payload:cartProduct})
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
          const data = await res.json();
          const wishlistProduct = products.find((item) => item._id === data.productId)
          dispatchProduct({type:"SET_WISHLIST_PRODUCTS", payload: wishlistProduct})
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
                <p className=' price'>Price : <span className='actual-price'>{singleProduct?.productPrice}</span><span className='p-2'>{singleProduct?.productDiscountPrice}</span></p>
                <p> <strong className='description'>Description :</strong> {singleProduct?.productDescription}</p>
                
                {cart?.find((item) => item._id === singleProduct._id) ? <button type="button" onClick= {() => navigate("/cart")}  className="btn btn-dark m-1">Go to cart</button> : <button type="button" onClick={ () => addToCart()} className="btn btn-dark m-1">Add to cart</button>}

               {wishlist?.find((item) => item._id === singleProduct._id) ? <button type="button"  className="btn btn-secondary m-1" onClick= {() => navigate("/wishlist")}>Go to wishlist</button>  : <button type="button"  onClick={()=>addToWishlist()} className="btn btn-secondary m-1">Add to wishlist</button>}
            </div>
        </div>
       </Layout>
    );
}

export default SingleProductPage;
