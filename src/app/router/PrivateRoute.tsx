import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = !!sessionStorage.getItem("access_token");
  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
