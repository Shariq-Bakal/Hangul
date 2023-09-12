import {Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Productpage from "./pages/Productpage";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/products" element={<Productpage/>} />
      <Route path={`products/:id`} element={<SingleProductPage/>} />  
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/wishlist" element={<WishlistPage/>}/>
      <Route path="/account" element={<AccountPage/>}/>

    </Routes>
  </>
  );
}

export default App;
