import "./style.css";
import "./css/chatContainer.css";
import "./css/conContainer.css";
import "./css/sidebar.css";
import "./css/main.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { Route, Routes, useNavigate, Navigate, Router } from "react-router-dom";
import Verify from "./components/Verify";
import { useUser } from "./context/userContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // const { user } = useUser();
  const navigate = useNavigate();
  return (
    <Routes>
      <Route>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/user/verify-email" element={<Verify />} />
      </Route>
    </Routes>
  );
}

export default App;
