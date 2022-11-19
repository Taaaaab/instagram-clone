import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import { AuthProvider } from "./contexts/AuthContext";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default RouteSwitch;