import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import Alert from "react-bootstrap/Alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useUserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError(null);
    setLoading(true);
    try {
      await resetPassword(email);
      setLoading(false);
      setMessage("Check your inbox for further details");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <>loading...</>;
  return (
    <div className="signInPage">
      <h2 className="title">Forgotten Password</h2>
      <h3 className="subtitle">
        Enter your email and we'll send you a password reset link
      </h3>
      {error && <Alert variant="Error">{error}</Alert>}
      {message}
      <form id="form">
        <label htmlFor="email">E-mail: </label>
        <input
          id="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          required
        />
      </form>
      <button
        className="button"
        type="submit"
        value="Submit"
        onClick={handleSubmit}
      >
        Reset my password
      </button>
      <br />
      <NavLink to="/">Already have an account? Log In</NavLink>
    </div>
  );
};

export default ForgotPassword;
