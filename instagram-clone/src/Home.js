const Home = () => {
    return (
      <div className="container">
        <header>
          <div>Instagram</div>
          <div className="search-bar">Search</div>
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