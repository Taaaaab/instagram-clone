import React, { useRef, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import phone from '../images/phone.png';
import instagram from '../images/instagram.png';
import appstore from '../images/appstore.png';
import playstore from '../images/playstore.png';
import '../App.css';

export default function Signup() {
    const emailRef = useRef();
    const userNameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const auth = getAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    async function handleSubmit(e) {
      e.preventDefault()

      if (passwordRef.current.value !==
        passwordConfirmRef.current.value) {
          return setError('Passwords do not match')
        }

      try {
        setError('')
        setLoading(true)
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        navigate('/dashboard')
      } catch {
        setError('Failed to create an account')
      }
      setLoading(false)
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
            ref={emailRef}
            placeholder='Email' 
            required
            />
            <input 
            type="text" 
            ref={userNameRef}
            placeholder='Username' 
            required
            />
            <input 
            type="password"
            ref={passwordRef}
            placeholder='Password' 
            required 
            />
            <input 
            type="password"
            ref={passwordConfirmRef}
            placeholder='Confirm Password' 
            required 
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