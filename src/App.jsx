import { useContext } from "react";
import { Routes ,Route} from "react-router-dom";
import Auth from "./pages/Auth";
function App() {
  
  return (
    <div className=""> 
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
