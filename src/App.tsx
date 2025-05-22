import './App.css';
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Shop from "./pages/Shop";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [role, setRole] = useState<"admin" | "worker" | null>(null);
  const [loading, setLoading] = useState(true);

  // Automatically detect auth state (e.g., refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email?.startsWith("admin")) setRole("admin");
      else if (user?.email?.startsWith("worker")) setRole("worker");
      else setRole(null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="App">
      <Routes>
        <Route
          path="/"
          element={
            role ? (
              role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/shop" />
            ) : (
              <Login onLogin={setRole} />
            )
          }
        />
        <Route
          path="/shop"
          element={role === "worker" ? <Shop /> : <Navigate to="/" />}
        />
        <Route
          path="/admin"
          element={role === "admin" ? <Admin /> : <Navigate to="/" />}
        />
        <Route path="/login" element={<Login onLogin={setRole} />} />
      </Routes>
    </div>
  );
}

export default App;
