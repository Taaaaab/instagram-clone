import logo from './logo.svg';
import './App.css';
import './index.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <div className='Phone-img'></div>
        <div className='Login-box'>
          <h1>Instagram</h1>
          <form className='Login-form'>
            <input placeholder='Phone number, username or email'></input>
            <input placeholder='Password'></input>
            <button>Log in</button>
          </form>
          <div className='Signup-box'></div>
        </div>
        <div>Don't have an account? <button>Enter as guest</button></div>
      </div>
      <footer><a>Meta</a> <a>About</a> <a>Blog</a> <a>Jobs</a> <a>Help</a> <a>API</a> <a>Privacy</a> <a>Terms</a> <a>Top Accounts</a> <a>Hashtags</a> <a>Locations</a> <a>Instagram Lite</a> <a>Contact Uploading & Non-Users</a> <a>Digital Collectibles Privacy Notice</a> <a>English</a> <a>© 2022 Instagram from Meta</a></footer>
    </div>
  );
}

export default App;
