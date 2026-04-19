import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // TEMP: replace with real auth later
  const isAuthenticated = localStorage.getItem("token");
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
