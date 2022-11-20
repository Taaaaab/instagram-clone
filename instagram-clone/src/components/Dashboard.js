import React, {useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import instagram from '../images/instagram.png';
import search from '../images/search.svg';
import profile from '../images/profile.png';
import bushBaby from '../images/bushbaby.jpeg';
import HeartImage from './HeartImage';
import '../Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState('');
  const {currentUser, logout} = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('')

    try {
      await logout()
      navigate('/')
    } catch {
      setError('Failed to log out')
    }
  }

  function handleLike() {
    setLikes(likes + 1)
  }

    return (
      <div className='container'>
        <header className='nav-bar'>
          <img className='instagram' alt='instagram' src={instagram} />
          <div className='Search-bar'>
            <img alt='search' className='Search-img' src={search} />
            <input className='Search-input' placeholder='Search'/>
          </div>
          <div className='Login-signup'>
            <strong>Email:</strong> {currentUser.email}
            <button onClick={handleLogout} id='sign-in' className='Login'>Log Out</button>
          </div>
        </header>
        <div className='Img-box'>
          <div className='Img-top'>
            <img id='user-pic' className='Profile-pic' alt='Profile-pic' src={profile}></img>
            <div className='Name-box'>
              <div className='Name'>Owen</div>
              <div id='user-name' className='Username'>@owen</div>
            </div>
          </div>
          <div className='Img-content'>
            <img className='Bushbaby-img' alt='bush baby' src={bushBaby}></img>
          </div>
          <div className='Img-icons'>
            <div>
              <HeartImage />
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-message-circle'><path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'></path></svg>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-share'><path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8'></path><polyline points='16 6 12 2 8 6'></polyline><line x1='12' y1='2' x2='12' y2='15'></line></svg>
            </div>
            <div className='share2'>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-share-2'><circle cx='18' cy='5' r='3'></circle><circle cx='6' cy='12' r='3'></circle><circle cx='18' cy='19' r='3'></circle><line x1='8.59' y1='13.51' x2='15.42' y2='17.49'></line><line x1='15.41' y1='6.51' x2='8.59' y2='10.49'></line></svg>
            </div>
          </div>
          <div className='Img-comments'>
            <div className='likes'>{likes} likes</div>
            <div className='view-all'>View All Comments</div>
            <span className='line'></span>
            <input className='Add-comment' placeholder='Add a comment...' />
          </div>
        </div>
        <div className='Img-box'>
          <div className='Img-top'>
            <img className='Profile-pic' alt='Profile-pic' src={profile}></img>
            <div className='Name-box'>
              <div className='Name'>Owen</div>
              <div className='Username'>@owen</div>
            </div>
          </div>
          <div className='Img-content'>
            <img className='Bushbaby-img' alt='bush baby' src={bushBaby}></img>
          </div>
          <div className='Img-icons'>
            <div>
              <HeartImage onClick={handleLike} />
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-message-circle'><path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'></path></svg>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-share'><path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8'></path><polyline points='16 6 12 2 8 6'></polyline><line x1='12' y1='2' x2='12' y2='15'></line></svg>
            </div>
            <div className='share2'>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-share-2'><circle cx='18' cy='5' r='3'></circle><circle cx='6' cy='12' r='3'></circle><circle cx='18' cy='19' r='3'></circle><line x1='8.59' y1='13.51' x2='15.42' y2='17.49'></line><line x1='15.41' y1='6.51' x2='8.59' y2='10.49'></line></svg>
            </div>
          </div>
          <div className='Img-comments'>
            <div className='likes'>38 likes</div>
            <div className='view-all'>View All Comments</div>
            <span className='line'></span>
            <input className='Add-comment' placeholder='Add a comment...' />
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;