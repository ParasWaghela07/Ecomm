import { useContext } from "react";
import { Routes ,Route} from "react-router-dom";
import Auth from "./pages/Auth";
import Homepage from "./pages/Homepage";
import { FirebaseContext } from "./context/FirebaseContext";
import './App.css';
import Home from "./pages/Home";
import MyCart from "./pages/MyCart";
import Products from "./pages/Products";
import PaymentPage from "./pages/PaymentPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderHistory from "./pages/OrderHistory";
import ProductPage from "./pages/ProductPage";
import OrderDetail from "./pages/OrderDetail";
import ProfileSettings from "./pages/ProfileSettings";

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
        <Route path='/payment' element={<PaymentPage/>}/>
        <Route path="/confirmation" element={<OrderConfirmation/>} />
        <Route path="/order-history" element={<OrderHistory/>} />
        <Route path="/single-products/:productId" element={<ProductPage/>} />
        <Route path="/order-detail/:orderId" element={<OrderDetail/>} />
        <Route path='/profile/settings' element={<ProfileSettings/>}/>
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
