import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Home from "./components/Home";
import Profile from "./components/Profile";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;