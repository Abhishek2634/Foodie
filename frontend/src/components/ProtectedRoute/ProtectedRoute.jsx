import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, setShowLogin }) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!currentUser && setShowLogin) {
      setShowLogin(true);
    }
  }, [currentUser, setShowLogin, location]);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;