import instagram from './instagram.png';
import './Home.css';

const Home = () => {
    return (
      <div className="container">
        <header className='nav-bar'>
          <img className='instagram' alt='instagram' src={instagram} />
          <input className="search-bar" placeholder='Search'/>
          <div>
            <button>Log In</button>
            <div>Sign Up</div>
          </div>
        </header>
        <div className="Img-box">
          <div className="Img-top">
            <img alt="Profile-pic"></img>
            <div className="Name"></div>
            <div className="Username"></div>
          </div>
          <div className="Img-content">
            <img alt="Photo1"></img>
          </div>
          <div className="Img-likes">
            <svg></svg>
            <svg></svg>
            <svg></svg>
            <div className="likes"> likes</div>
            <div>View All Comments</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;