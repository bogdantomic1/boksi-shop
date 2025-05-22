// src/pages/Login.tsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

interface LoginProps {
  onLogin: (role: "admin" | "worker") => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCred.user.email ?? "";

      if (userEmail.startsWith("admin")) onLogin("admin");
      else if (userEmail.startsWith("worker")) onLogin("worker");
      else setError("Unauthorized user.");
    } catch {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login} className="btn">Login</button>
    </div>
  );
}