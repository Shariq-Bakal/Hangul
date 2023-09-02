import { createContext,useContext,useReducer, } from "react";

const ProductContext = createContext();

const initialState = {
    products:[],
    singleProduct : {},
    cart:[],
    wishlist:[],
}

const productReducer = (state,action)=>{
    switch(action.type){
        case "GET_PRODUCTS":
            return {...state,products : action.payload};
        case "GET_SINGLE_PRODUCT":
            return {...state , singleProduct : action.payload};
        case "GET_CART_PRODUCTS":
            return {...state,cart:action.payload}
        case "SET_CART_PRODUCTS":
            return {...state,cart:[...state.cart,action.payload]}
        case "DELETE_CART_PRODUCTS":
            return {...state,cart:(state.cart.filter(product=> product._id!==action.payload._id))}
        case "GET_WISHLIST_PRODUCTS":
            return {...state,wishlist:action.payload}
        case "SET_WISHLIST_PRODUCTS":
            return {...state,wishlist:[...state.wishlist,action.payload]}
        case "DELETE_WISHLIST_PRODUCTS":
            return {...state,wishlist:state.wishlist.filter(product=>product._id!==action.payload._id)}
        default :
            return  state
    }
}

export const ProductProvider = ({children})=>{
    const [productState,dispatchProduct] = useReducer(productReducer,initialState)
    return (
        <ProductContext.Provider value={{productState,dispatchProduct}}>
            {children}
        </ProductContext.Provider>
    )

}

//creating custom hook

export const useProducts = () => useContext(ProductContext);


