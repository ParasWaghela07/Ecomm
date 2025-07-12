import { useContext } from "react";
import { Routes ,Route} from "react-router-dom";
import Auth from "./pages/Auth";
import Homepage from "./pages/Homepage";
function App() {
  
  return (
    <div className=""> 
      <Routes>
        <Route path="/" element={<h1><Homepage/></h1>} />
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
