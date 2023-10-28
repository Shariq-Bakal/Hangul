import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useProducts } from '../contexts/ProductContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useFilters } from '../contexts/FilterContext';
import { getSearchedData } from '../utils/searchData';
import { getSortedData} from "../utils/sortData";
import {getRatedData} from "../utils/rateData";
import {getProductsInPriceRange} from "../utils/filterByPrice"
import { Loader } from '../components/Loader';

const Productpage = () => {
    const {dispatchProduct , productState ,isFilterOpen , setIsFilterOpen } = useProducts();
    const { filterState : {searchQuery, rateBy , sortBy , price , showCodOnly} , isLoading , setIsLoading} = useFilters();
    const {products} = productState;
    const navigate = useNavigate();
  
    const openSidebar = (e) => {
      setIsFilterOpen(true)
    //   if (typeof window != 'undefined' && window.document) {
    //     document.body.style.overflow = 'hidden';
    // }
    }

    const closeSidebar = (e) => {
      setIsFilterOpen(false)
      // document.body.style.overflow = 'unset';
    }

    const fetchProducts = async () => {
      try{
        const response = await fetch("/api/products");
        const data = await response.json();
        dispatchProduct({type: "GET_PRODUCTS" , payload  : data?.products})
        setIsLoading(false)
      } catch(error) {
        console.log(error)
      }
    }

    const searchedProducts = getSearchedData(products, searchQuery);
    const productsInPriceRange = getProductsInPriceRange(searchedProducts, price);
    const ratedProducts = getRatedData(productsInPriceRange, rateBy);
    const sortedProducts = getSortedData(ratedProducts, sortBy);
    
    const getAllFilteredData = (products, { showCodOnly }) => {
      return products
        .filter(({ Cod }) => (showCodOnly ? Cod : true))
    };
  
    const filteredData = getAllFilteredData(sortedProducts, {showCodOnly});

    useEffect(()=>{
      setIsLoading(true)
      fetchProducts();

      },[]) 
    
      const getSingleProduct = async (product) => {
        try{
          navigate(`/products/${product._id}`)
          const res = await fetch(`/api/products/${product._id}`);
          const singleProduct = await res.json();
        } catch(error) {
          console.log(error)
        }
      }
    return (
        <Layout>
        { isLoading ? <Loader /> : <div>
        <button className='btn btn-secondary m-1' onClick = {() => openSidebar()}>Open filters </button> 
        {isFilterOpen && <button className='close-btn btn btn-secondary' onClick = {() => closeSidebar()}>&#10006;</button>}
        {isFilterOpen && <Sidebar /> }
        <div className='product-container'>
        {filteredData.map((product) => <div key={product?._id} className='m-2 product-card' onClick={() => !isFilterOpen && getSingleProduct(product)}>
          <img src= {product?.productImg} className= {isFilterOpen ? "img-fluid product-img" : "img-fluid product-img modal-open"} alt= {product?.productName} />
            <h5 className='p-2'>{product?.productName}</h5>
            <p className='p-2'>Rs.<span className='p-2 actual-price'>{product?.productPrice}</span><span>{product?.productDiscountPrice}</span></p>
          </div>)}
        </div>
</div>}
       
        </Layout> 
       
    );
}

export default Productpage;
