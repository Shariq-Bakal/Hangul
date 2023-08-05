
import {Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Productpage from "./pages/Productpage";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/products" element={<Productpage/>} />
      
      
    </Routes>
  </>
  );
}

export default App;
