import { useContext } from "react";
import { Routes ,Route} from "react-router-dom";
import Auth from "./pages/Auth";
import Homepage from "./pages/Homepage";
import { FirebaseContext } from "./context/FirebaseContext";
import './App.css';

function App() {
  const {loading}=useContext(FirebaseContext);
  return (
    <div className=""> 
      <Routes>
        <Route path="/" element={<h1><Homepage/></h1>} />
        <Route path="/Auth" element={<Auth />} />
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
