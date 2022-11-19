import React, { useRef } from 'react';
import phone from '../images/phone.png';
import instagram from '../images/instagram.png';
import appstore from '../images/appstore.png';
import playstore from '../images/playstore.png';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();

  return (
    <div className="App">
    <div className="App-header">
      <img className='Phone-img' alt='phone' src={phone} />
      <div className='Right-box'>
      <div className='Login-box'>
          <img className='Instagram' alt='Instagram' src={instagram} />
          <form className='Login-form'>
            <input 
            type="email" 
            ref={emailRef}
            placeholder='Username or email' 
            required
            />
            <input 
            type="password"
            ref={passwordRef}
            placeholder='Password' 
            required 
            />
            <button className='Login-btn'>Log in</button>
          </form>
        </div>
        <div className='Signup-box'>
            Don't have an account?<a href='/home'> &nbsp;Enter as guest</a>
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