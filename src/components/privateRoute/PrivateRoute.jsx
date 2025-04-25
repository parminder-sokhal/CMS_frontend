import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated || localStorage.getItem("Bearer")
    ? <Outlet />
    : <Navigate to="/signin" />;
}
