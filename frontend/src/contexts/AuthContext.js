import {useReducer , createContext, useContext, useState} from "react"

const initialState = {
    loggedInUser : null,
    token : null,
    authStatus : localStorage.getItem("AUTH_TOKEN") ? true : false
}

const authReducer = (state,action) => {
     switch(action.type) {
        case "SIGIN_IN_USER" :
            const {user , token} = action.payload
            return {...state , loggedInUser : user , token : token , authStatus : true}
        case "LOGOUT" :
            return {...state , loggedInUser : null , token  : action.payload , authStatus : false}
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