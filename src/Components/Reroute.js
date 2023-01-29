import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Reroute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1850);
  }, []);

  return <h2>Redirecting to login page...</h2>;
};

export default Reroute;
