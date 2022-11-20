import React, {useRef, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import instagram from '../images/instagram.png';
import search from '../images/search.svg';
import profile from '../images/profile.png';
import bushBaby from '../images/bushbaby.jpeg';
import HeartImage from './HeartImage';
import CommentImage from './CommentImage';
import '../Dashboard.css';
import {useAuth} from '../contexts/AuthContext';
import {
  getAuth,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const Dashboard = () => {
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState('');
  const {currentUser, logout} = useAuth();
  const navigate = useNavigate();
  const commentRef = useRef();

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

  // Saves a new message to Cloud Firestore.
  async function saveMessage(e) {
    e.preventDefault()
  // Add a new message entry to the Firebase database.
  try {
    await addDoc(collection(getFirestore(), 'comments'), {
      name: currentUser.email,
      text: commentRef.current.value,
      timestamp: serverTimestamp()
    });
    commentRef.current.value = ('');
  }
  catch(error) {
    console.error('Error writing new message to Firebase Database', error);
  }
 }

  // Loads chat messages history and listens for upcoming ones.
  function loadMessages() {
    // Create the query to load the last 12 messages and listen for new ones.
    const recentMessagesQuery = query(collection(getFirestore(), 'messages'), orderBy('timestamp', 'desc'), limit(12));
  
    // Start listening to the query.
  //   onSnapshot(recentMessagesQuery, function(snapshot) {
  //   snapshot.docChanges().forEach(function(change) {
  //     if (change.type === 'removed') {
  //     //  deleteMessage(change.doc.id);
  //     } else {
  //       var message = change.doc.data();
  //       displayMessage(change.doc.id, message.timestamp, message.name,
  //                     message.text, message.profilePicUrl, message.imageUrl);
  //     }
  //   });
  // });
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
              <CommentImage onClick={saveMessage} />
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
            <input className='Add-comment' ref={commentRef} type='text' placeholder='Add a comment...' />
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;