import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useAuth();
  if (loading) {
    return <div className="text-center mt-10">Cargando...</div>;
  } else {
    return isAuth ? children : <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
