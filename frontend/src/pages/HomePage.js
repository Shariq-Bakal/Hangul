import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import Hangul from "../images/hangul.jpg"
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../contexts/ProductContext'

const HomePage = () => {
  const navigate = useNavigate();
  const {productState : {products} , dispatchProduct} = useProducts();
  const fetchProducts = async () => {
    try{
      const response = await fetch("/api/products");
      const data = await response.json();
      dispatchProduct({type: "GET_PRODUCTS" , payload  : data?.products})
    } catch(error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchProducts()
  },[])
  return ( <Layout>
     <div className="hero-section">
        <section className="homepage-description">
          <h1>
            Discover the Artistry of Kashmir: Shop Tradition, Shop Excellence!
          </h1>
          <p className="text">
            Experience the Timeless Elegance of Kashmir Your Gateway to
            Authentic Kashmiri Treasures!
          </p>
          <p className="text">
            Kashmiri Treasures: Where Tradition Meets Luxury, Craft Meets
            Culture!
          </p>
          <p className="text">
           Discover the rich heritage of Kashmir!
          </p>
          <div>
            <div className='text-img'>HANGUL</div>
            <button className="ctc-btn" onClick={() => navigate("/products")}>Shop Now &#8594; </button>
          </div>
        </section>
        <section className="homepage-img">
          <img src={Hangul} alt="hero-img" />
        </section>
      </div>
      <div className="featured">
        <h1>Featured Products</h1>
        
        <div className="flex-card suggested-product-container">
        {products?.map(({productName , rating , productDiscountPrice , productImg}) =>    <main className="suggested-product-card">
            <img className='img-fluid' src={productImg} alt="" />
            <hr className="hr" />
            <div className="flex-card">
              <p className="name"> {productName}</p>
              <p className="rating"> {rating} &#9733; </p>
            </div>
            <p className="price">Price : {productDiscountPrice}</p>
            <button className="btn cart-btn">Add to cart</button>
          </main> )}
       
        </div>
      </div>
  </Layout>)
}

export default HomePage