import { useContext } from "react";
import { Routes ,Route} from "react-router-dom";
import Auth from "./pages/Auth";
import Homepage from "./pages/Homepage";
import { FirebaseContext } from "./context/FirebaseContext";
import './App.css';
import Home from "./pages/Home";
import MyCart from "./pages/MyCart";
import Products from "./pages/Products";

function App() {
  const {loading}=useContext(FirebaseContext);
  return (
    <div className=""> 
      <Routes>
        <Route path="/home" element={<h1><Homepage/></h1>} />
        <Route path="/Auth" element={<Auth />} />
        <Route path='/' element={<Home/>}/>
        <Route path='/mycart' element={<MyCart/>}/>
        <Route path='/products/:category' element={<Products/>}/>
      </Routes>

      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default App;
