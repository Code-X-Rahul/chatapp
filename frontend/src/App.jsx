import { useState, useEffect, useRef } from "react";
import "./style.css";
import "./css/chatContainer.css";
import "./css/conContainer.css";
import "./css/sidebar.css";
import "./css/main.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import Verify from "./components/Verify";
import { UserContext } from "./context/userContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <ProtectedRoute path="/dashboard" exact>
          <Dashboard />
        </ProtectedRoute>
        <Route path="/user/verify-email" element={<Verify />} />
      </Route>
    </Routes>
  );
}

export default App;
