import {Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Productpage from "./pages/Productpage";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RequiresAuth from "./components/RequiresAuth";
import CheckoutSuccess from "./pages/CheckoutSuccess";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/products" element={<Productpage/>} />
      <Route path={`products/:id`} element={<SingleProductPage/>} />  
      <Route path="/cart" element={<RequiresAuth> <CartPage/> </RequiresAuth>} />
      <Route path="/wishlist" element={<RequiresAuth> <WishlistPage/> </RequiresAuth>}/>
      <Route path="/account" element={<RequiresAuth> <AccountPage /> </RequiresAuth>}/>
      <Route path="/login" element = {<LoginPage />} />
      <Route path="/signup" element = {<SignupPage />} />
      <Route path="/checkout-success" element = {<CheckoutSuccess />} />

    </Routes>
  </>
  );
}

export default App;
