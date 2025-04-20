import "./form.css";

export default function LoginForm() {
  return (
    <div className="form-wrapper">
      <h2 className="form-title">Login</h2>
      <form className="form">
        <input className="form-input" type="email" placeholder="Email" />
        <input className="form-input" type="password" placeholder="Password" />
        <button type="button" className="form-button">
          Login
        </button>
      </form>
    </div>
  );
}
