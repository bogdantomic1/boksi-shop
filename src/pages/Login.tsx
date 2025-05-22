import "../css/Login.css";
export default function Login() {
  return (
    <div className="login-container">
      <div className="form-card">
        <h2>Login</h2>
        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Your password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
