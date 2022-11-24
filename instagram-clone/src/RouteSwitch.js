import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

const RouteSwitch = () => {
  return (
    <BrowserRouter>
    <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          />
          <Route path='/profile' element={<Profile />} />
        </Routes>
    </AuthContextProvider>
    </BrowserRouter>
  );
};

export default RouteSwitch;