import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router } from "react-router-dom"
import { ProductProvider } from './contexts/ProductContext';
import { AuthProvider } from './contexts/AuthContext';
import { FilterProvider } from './contexts/FilterContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ProductProvider>
        <AuthProvider>
          <FilterProvider>
            <App/>
          </FilterProvider>
        </AuthProvider>
      </ProductProvider>
    </Router>
  </React.StrictMode>
);

