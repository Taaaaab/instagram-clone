import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import phone from '../images/phone.png';
import instagram from '../images/instagram.png';
import appstore from '../images/appstore.png';
import playstore from '../images/playstore.png';
import '../index.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password, userName);
      navigate('/dashboard');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <img className="Phone-img" alt="phone" src={phone} />
        <div className="Right-box">
          <div className="Login-box">
            <img className="Instagram" alt="Instagram" src={instagram} />
            {error && <div className="error">{error}</div>}
            <form className="Login-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Username"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <button className="Login-btn">Sign up</button>
            </form>
          </div>
          <div className="Signup-box">
            Already have an account?
            {' '}
            <Link to="/">&nbsp;Log in</Link>
          </div>
          <div className="get-app">Get the app.</div>
          <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo">
            <img className="appstore" alt="apple app store" src={appstore} />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.instagram.android">
            <img className="playstore" alt="google play store" src={playstore} />
          </a>
        </div>
      </div>
      <footer>
        <a>Meta</a>
        {' '}
        <a>About</a>
        {' '}
        <a>Blog</a>
        {' '}
        <a>Jobs</a>
        {' '}
        <a>Help</a>
        {' '}
        <a>API</a>
        {' '}
        <a>Privacy</a>
        {' '}
        <a>Terms</a>
        {' '}
        <a>Top Accounts</a>
        {' '}
        <a>Hashtags</a>
        {' '}
        <a>Locations</a>
        {' '}
        <a>Instagram Lite</a>
        {' '}
        <a>Contact Uploading & Non-Users</a>
        {' '}
        <a>Digital Collectibles Privacy Notice</a>
        {' '}
        <a>English</a>
        {' '}
        <a>© 2022 Instagram from Meta</a>
      </footer>
    </div>
  );
}
