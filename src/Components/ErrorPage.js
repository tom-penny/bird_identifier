import Reroute from "./Reroute";

const ErrorPage = () => {
  return (
    <>
      <h1 className="error">404 Error</h1>
      <h2 className="errorMessage">Page Not Found</h2>
      <Reroute />
    </>
  );
};

export default ErrorPage;
