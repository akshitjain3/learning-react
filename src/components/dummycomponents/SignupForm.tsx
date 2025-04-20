import "./form.css";

export default function SignupForm() {
  return (
    <div className="form-wrapper">
      <h2 className="form-title">Sign Up</h2>
      <form className="form">
        <input className="form-input" type="text" placeholder="Name" />
        <input className="form-input" type="email" placeholder="Email" />
        <input className="form-input" type="password" placeholder="Password" />
        <button type="button" className="form-button">
          Create Account
        </button>
      </form>
    </div>
  );
}
