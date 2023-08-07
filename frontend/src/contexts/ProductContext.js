import { createContext,useContext,useReducer, } from "react";

const ProductContext = createContext();

const initialState = {
    products:[],
    cart:[],
    wishlist:[],
}

const productReducer = (state,action)=>{
    switch(action.type){
        case "GET_PRODUCTS":
            return {...state,products:action.payload};
        default:
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

export const useProducts = ()=>useContext(ProductContext);


