import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Profile = ({count}) => {
  const { logout } = useUserAuth();
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { resetPassword } = useUserAuth();
  console.log(user.reloadUserInfo.localId);
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleClick = async (event) => {
    event.preventDefault();
    setMessage("");
    setError(null);
    setLoading(true);
    try {
      await resetPassword(user.email);
      setLoading(false);
      setMessage("Check your inbox for further details");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h2 className="profile">Profile</h2>
      <h3>Username: {user?.email}</h3>
      <br />
      <h4>{count}/900 birds found</h4>
      <br/>
      {message}
      <br/>
      <button onClick={handleClick} className="button">
        Reset Password
      </button>
      <button className="button3" onClick={handleLogout}>
        Log Out
      </button>
    </>
  );
};

export default Profile;
