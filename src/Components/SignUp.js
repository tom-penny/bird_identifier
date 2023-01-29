import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import Alert from "react-bootstrap/Alert";
import { db } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";
import { birds } from "./birds";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const { user } = useUserAuth();
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError(null);
    try {
      await signUp(email, password);
      setMessage("Account Created. Logging in...");
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    if (user) {
      const birdsCollectionRef = collection(
        db,
        `${user.reloadUserInfo.localId}`
      );
      addDoc(birdsCollectionRef, { birds: JSON.stringify(birds) });
    }
  }, [user]);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="signInPage">
      <h2 className="sign">Sign Up</h2>
      {error && <Alert variant="Error">{error}</Alert>}

      <form id="form">
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
          type={passwordShown ? "text" : "password"}
          id="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
        />
      </form>

      <button className="button2" onClick={togglePassword}>
        Show Password
      </button>
      <br />
      {message}
      <br />
      <button
        className="button"
        type="submit"
        value="Submit"
        onClick={handleSubmit}
      >
        Sign Up
      </button>
      <br />

      <NavLink to="/">Already have an account? Log In</NavLink>
    </div>
  );
};

export default SignUp;
