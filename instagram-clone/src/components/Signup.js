import React, { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import phone from '../images/phone.png';
import instagram from '../images/instagram.png';
import appstore from '../images/appstore.png';
import playstore from '../images/playstore.png';
import '../App.css';

export default function Signup() {
    const [registerEmail, setRegisterEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })

    const register = async () => {
      try {
        setError('');
        setLoading(true);
        const user = await createUserWithEmailAndPassword(
          auth, 
          registerEmail, 
          registerPassword
        );
        console.log(user);
        navigate('/dashboard');
      } catch (error) {
        setError('Failed to create an account');
      }
      setLoading(false);
    };

    function handleSubmit(e) {
      e.preventDefault()

      if (registerPassword !==
        passwordConfirm) {
          return setError('Passwords do not match')
        }

      register();
    }

  return (
    <div className="App">
    <div className="App-header">
      <img className='Phone-img' alt='phone' src={phone} />
      <div className='Right-box'>
      <div className='Login-box'>
          <img className='Instagram' alt='Instagram' src={instagram} />
          {error && <div className='error'>{error}</div>}
          <form className='Login-form' onSubmit={handleSubmit}>
            <input 
            type="email" 
            placeholder='Email' 
            required
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
            />
            <input 
            type="text" 
            placeholder='Username' 
            required
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            />
            <input 
            type="password"
            placeholder='Password' 
            required
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }} 
            />
            <input 
            type="password"
            placeholder='Confirm Password' 
            required
            onChange={(event) => {
              setPasswordConfirm(event.target.value);
            }} 
            />
            <button disabled={loading} className='Login-btn'>Sign up</button>
          </form>
        </div>
        <div className='Signup-box'>
            Already have an account? <Link to="/">&nbsp;Log in</Link>
        </div>
        <div className='get-app'>Get the app.</div>
        <a href='https://apps.apple.com/app/instagram/id389801252?vt=lo'>
          <img className='appstore' alt='apple app store' src={appstore} />
        </a>
        <a href='https://play.google.com/store/apps/details?id=com.instagram.android'>
          <img className='playstore' alt='google play store' src={playstore} />
        </a>
      </div>  
    </div>
    <footer><a>Meta</a> <a>About</a> <a>Blog</a> <a>Jobs</a> <a>Help</a> <a>API</a> <a>Privacy</a> <a>Terms</a> <a>Top Accounts</a> <a>Hashtags</a> <a>Locations</a> <a>Instagram Lite</a> <a>Contact Uploading & Non-Users</a> <a>Digital Collectibles Privacy Notice</a> <a>English</a> <a>© 2022 Instagram from Meta</a></footer>
  </div>
  )
}