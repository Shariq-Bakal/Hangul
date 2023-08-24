import {Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Productpage from "./pages/Productpage";
import SingleProductPage from "./pages/SingleProductPage";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/products" element={<Productpage/>} />
      <Route path={`products/:id`} element={<SingleProductPage/>} />  
    </Routes>
  </>
  );
}

export default App;
