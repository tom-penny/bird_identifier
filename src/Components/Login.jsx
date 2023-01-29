import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useUserAuth();
  const navigate = useNavigate();
  const { user } = useUserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  if (user) return navigate("/home");
  return (
    <div className="coverLogin">
      <div className="signInPage">
        <h2 className="sign">Sign in</h2>
        {error && <Alert variant="Error">{error}</Alert>}
        <form>
          <label htmlFor="email">E-mail: </label>
          <input
            id="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
          <br />

          <label htmlFor="password">Password: </label>
          <input
            autoComplete="off"
            type="password"
            id="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          />
          <br />
        </form>
        <button
          className="button"
          type="submit"
          value="Submit"
          onClick={handleSubmit}
        >
          Sign in
        </button>
        <br />

        <NavLink to="/signup">Don't have an account? Sign Up</NavLink>
        <br />
        <br />
        <NavLink to="/forgot-password">Forgot my password</NavLink>
      </div>
    </div>
  );
};

export default Login;
