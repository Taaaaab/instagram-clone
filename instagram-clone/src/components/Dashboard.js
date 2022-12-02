import React from 'react';
import { useNavigate } from 'react-router-dom';
import instagram from '../images/instagram.png';
import search from '../images/search.svg';
import { UserAuth } from '../context/AuthContext';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
import '../dashboard.css';

function Dashboard() {
  const { user, logout } = UserAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="container">
      <header className="nav-bar">
        <img className="instagram" alt="instagram" src={instagram} />
        <div className="search-bar">
          <img alt="search" className="search-img" src={search} />
          <input className="search-input" placeholder="Search" />
        </div>
        <UploadForm />
        <div className="login-signup">
          @
          {user && user.displayName}
          <button type="button" onClick={handleLogout} id="sign-in" className="login">Log Out</button>
        </div>
      </header>
      <ImageGrid />
    </div>
  );
}

export default Dashboard;
