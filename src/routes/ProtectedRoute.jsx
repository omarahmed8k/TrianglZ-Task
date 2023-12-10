import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import BaseLayout from "../layouts/BaseLayout";

export default function ProtectedRoute() {
  const auth = useSelector((state) => state.auth);
  if (auth?.access) { return <BaseLayout /> }
  else { return <Navigate to="/login" /> }
}
