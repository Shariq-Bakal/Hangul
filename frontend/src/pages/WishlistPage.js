import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useProducts } from '../contexts/ProductContext';
import { Loader } from '../components/Loader';
import { useFilters } from '../contexts/FilterContext';

const WishlistPage = () => {
    const {productState:{wishlist},dispatchProduct} = useProducts();
    const {isLoading , setIsLoading} = useFilters();

    const getWishlistProducts = async ()=>{
        const res = await fetch(`/api/wishlist`);
        const data = await res.json();
        dispatchProduct({type:"GET_WISHLIST_PRODUCTS",payload:data.wishlistProducts});
        setIsLoading(false)
    }

    const removeFromWishlist = async (product)=>{
        const res = await fetch(`/api/wishlist/${product._id}`,{
            method:"DELETE",
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        dispatchProduct({type:"DELETE_WISHLIST_PRODUCTS",payload:data.productId})   
    }
    useEffect(()=>{
        setIsLoading(true)
        getWishlistProducts();
    },[])

    return (
        <Layout>
        { isLoading ? <Loader/> : <div>
            <h4 className='heading m-4'>My Wishlist ({wishlist?.length})</h4>
            <div className='product-container'>
            {
            wishlist?.map(product=><div key={product?._id} className='m-2 product-card wishlist-card'>
            <img src= {product?.productImg} className="img-fluid" alt= {product?.productName} />
              <h4 className='p-2'>{product?.productName}</h4>
              <p className='p-2'>Price : <span className='actual-price'>{product?.productPrice}</span><span className='p-2'>{product?.productDiscountPrice}</span></p>
              <button type="button" onClick={ () => removeFromWishlist(product)} className="btn btn-dark m-2">Remove from Wishlist</button> <br/> 
            </div>)
        } 
        </div>
        </div>}
        </Layout>
    );
}

export default WishlistPage;
