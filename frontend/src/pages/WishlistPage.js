import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useProducts } from '../contexts/ProductContext';





const WishlistPage = () => {
    const {productState:{wishlist},dispatchProduct} = useProducts()

    const getWishlistProducts = async ()=>{
        const res = await fetch(`/api/wishlist`);
        const data = await res.json();
        console.log(data)
        
        dispatchProduct({type:"GET_WISHLIST_PRODUCTS",payload:data.wishlistProducts});
    }
    const removeFromWishlist = async (product)=>{
        const res = await fetch(`/api/wishlist/${product._id}`,{
            method:"DELETE",
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({product})
        });
        const data = await res.json();
        dispatchProduct({type:"DELETE_WISHLIST_PRODUCTS",payload:data.product})
        
    }
    useEffect(()=>{
        getWishlistProducts();
    },[])
    console.log(wishlist)
    return (
        <Layout>
            {/* <div className='wislist-container'> */}
            {
            wishlist?.map(product=><div key={product?._id} className='m-2'>
            <img src= {product?.productImg} className="img-fluid" alt= {product?.productName} />
              <h4 className='p-2'>{product?.productName}</h4>
              <p className='p-2'>Price : <span className='actual-price'>{product?.productPrice}</span><span className='p-2'>{product?.productDiscountPrice}</span></p>
              <button type="button" onClick={ () => removeFromWishlist(product)} className="btn btn-dark m-2">Remove from Wishlist</button> <br/>
              
            </div>

            )
        } 

            {/* </div> */}

        </Layout>
    );
}

export default WishlistPage;
