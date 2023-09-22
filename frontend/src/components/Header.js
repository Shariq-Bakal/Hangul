import React  from 'react'
import {NavLink,Link, useNavigate} from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'

const Header = () => {

  const { authState : {authStatus} , dispatchAuth} = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const res = await fetch("/api/user/logout");
    const data = await res.json();
    dispatchAuth({type : "LOGOUT" , payload : data.token})
    localStorage.removeItem("AUTH_TOKEN")
    navigate("/login")
  }

  return (
  <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand">Hangul</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to="/" className="nav-link " aria-current="page" >Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/products" className="nav-link">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link">About</NavLink>
        </li>
       { authStatus ? <button type="btn" className="btn btn-secondary m-1" onClick={logoutHandler} >Logout</button>
        : <li className="nav-item">
          <NavLink to="/login" className="nav-link">Login</NavLink>
        </li>}
      </ul>
    </div>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to="/cart" className="nav-link " aria-current="page"> Cart</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/wishlist"className="nav-link">Wishlist</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to = "/account" className="nav-link">Account</NavLink>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

   
  )
}

export default Header