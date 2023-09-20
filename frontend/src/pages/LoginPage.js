import React , { useState } from 'react'
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const [userInfo , setUserInfo] = useState({email : "" , password : ""});
    const {errors , setErrors , dispatchAuth } = useAuth();
    const navigate = useNavigate();
    
    const loginHandler = async (e) => {
        e.preventDefault();
        setErrors({...errors , email:"" , password : ""})
        try{
            const res = await fetch("/api/user/login" , {
                method : "POST" ,
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({userInfo})
            });
            const data = await res.json();
    
            if(data.success) {
                localStorage.setItem("AUTH_TOKEN" , data.token)
                dispatchAuth({type : "SIGIN_IN_USER" , payload : data})
                setUserInfo({...userInfo , email : "" , password : ""})
                navigate("/")
            }
            if(!data.success){
                setErrors({...errors , email : data?.errors?.email , password : data?.errors?.password})
            }
        }catch(e){
            console.log(e)
        }
    }
  return (
    <Layout>
    <form onSubmit={loginHandler} className='auth-form'>
    <h4 className='text-center'>Login</h4>
    <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">Email address</label>
        <input  type="email" value={userInfo.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setUserInfo({...userInfo , email : e.target.value})} />
        <div className='error-msg'>{errors.email}</div>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Password</label>
        <input  type="password" value={userInfo.password} className="form-control" id="exampleInputPassword1" onChange={(e) => setUserInfo({...userInfo , password : e.target.value})}/>
        <div className='error-msg'>{errors.password}</div>
    </div>
    <button type="submit" className="btn btn-dark m-1" >Login</button>
    <div className='link-wrapper'>
        <span onClick={() => navigate("/signup")} className='link'>Not a user? Register here</span>
    </div>
    </form>
    </Layout>
  )
}

export default LoginPage