import {useReducer , createContext, useContext, useState} from "react"

const initialState = {
    user : null,
    token : null,
    authStatus : false
}

const authReducer = (state,action) => {
     switch(action.type) {
        case "LOGIN" :
            return {...state , user : action.payload}
        default :
            return {...state}
     }
}

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authState , dispatchAuth] = useReducer(authReducer , initialState)
    const [errors , setErrors] = useState({email : "" , password : ""})

    return <AuthContext.Provider value={{authState , dispatchAuth , errors , setErrors}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)