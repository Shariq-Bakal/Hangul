import {useReducer , createContext, useContext, useState} from "react";

const initialState = {
    rateBy : null,
    sortBy : null,
    price : 5000,
    showCodOnly : false,
    searchQuery : ""
}

const filterReducer = (state,action) => {
     switch(action.type) {
        case "FILTER_BY_RATING" :
            return {...state , rateBy : action.payload}
        case "SORT_BY_PRICE" :
            return {...state , sortBy : action.payload}
        case "FILTER_BY_PRICE" :
            return {...state , price : action.payload}
        case "SHOW_COD_ONLY" :
            return {...state , showCodOnly : !state.showCodOnly}
        case "SEARCH" :
            return {...state , searchQuery : action.payload}
        case "CLEAR_ALL_FILTERS" :
            return {...state , rateBy : null , sortBy : null , price: 5000 , searchQuery : "" , showCodOnly : false}
        default :
            return {...state}
     }
}

const FilterContext = createContext();

export const FilterProvider = ({children}) => {
    const [filterState , dispatchFilters] = useReducer(filterReducer , initialState);
    const [isLoading , setIsLoading] = useState(false)

    return <FilterContext.Provider value={{filterState , dispatchFilters , isLoading , setIsLoading}}>
        {children}
    </FilterContext.Provider>
}

export const useFilters = () => useContext(FilterContext)