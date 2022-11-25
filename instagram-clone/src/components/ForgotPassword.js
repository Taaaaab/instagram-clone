import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import phone from '../images/phone.png';
import instagram from '../images/instagram.png';
import appstore from '../images/appstore.png';
import playstore from '../images/playstore.png';
import '../App.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { passwordReset } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');
    setError('');
    try {
      await passwordReset(email);
      setMessage('Check your inbox for further instructions');
    } catch (e) {
      setError('Failed to reset password');
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <img className="Phone-img" alt="phone" src={phone} />
        <div className="Right-box">
          <div className="Login-box">
            <img className="Instagram" alt="Instagram" src={instagram} />
            {message && <div className="message">{message}</div>}
            {error && <div className="error">{error}</div>}
            <form className="Login-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="Login-btn">Reset Password</button>
            </form>
            <Link className="forgot" to="/">Login</Link>
          </div>
          <div className="Signup-box">
            Don't have an account?
            {' '}
            <Link to="/signup">&nbsp;Sign Up</Link>
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
