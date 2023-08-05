import React from 'react'
import {NavLink} from "react-router-dom"

const Header = () => {
  return (
  <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <NavLink className="navbar-brand" href="#">Hangul</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" href="#">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" href="#">Products</NavLink>
        </li>
        <li className="nav-item dropdown">
          <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </NavLink>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" >Paper mache</NavLink></li>
            <li><NavLink className="dropdown-item" >Pherans</NavLink></li>
            <li><hr className="dropdown-divider" /></li>
            <li><NavLink className="dropdown-item">Namdas</NavLink></li>
          </ul>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link">About</NavLink>
        </li>
      </ul>
    </div>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" href="#">Cart</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" href="#">Wishlist</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link">Account</NavLink>
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