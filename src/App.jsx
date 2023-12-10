import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/Auth/Login/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<ProtectedRoute />} />
        <Route path="/login" element={auth?.access ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
