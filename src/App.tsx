import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Shop from "./pages/Shop";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

function App() {


  return (
    
    <div id="App">
     <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
    
  )
}

export default App
