import React, {
  Children, useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import instagram from '../images/instagram.png';
import search from '../images/search.svg';
import { UserAuth } from '../context/AuthContext';
import { auth, db } from '../firebase-config';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
import '../dashboard.css';

function Dashboard() {
  const { user, logout } = UserAuth();
  const commentRef = useRef();
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out');
    } catch (e) {
      console.log(e.message);
      setError('Error logging out');
    }
  };

  // useEffect(() => {
  //   getComments();
  // }, []);

  // useEffect(() => {
  // }, [comments]);

  // function to grab comments from firebase
  function getComments() {
    const commentCollectionRef = collection(db, 'comments');
    const q = query(commentCollectionRef, orderBy('timestamp'), limit(5));
    getDocs(q)
      .then((response) => {
        const comm = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setComments(comm);
      }).catch((error) => console.log(error.message));
  }

  // Saves a new message to Cloud Firestore.
  async function saveMessage(e) {
    e.preventDefault();
    // Add a new message entry to the Firebase database.
    try {
      await addDoc(collection(db, 'comments'), {
        email: auth.currentUser.email,
        username: auth.currentUser.displayName,
        text: commentRef.current.value,
        timestamp: serverTimestamp(),
      });
      commentRef.current.value = ('');
      getComments();
    } catch (error) {
      console.error('Error writing new message to Firebase Database', error);
    }
  }

  return (
    <div className="container">
      <header className="nav-bar">
        <img className="instagram" alt="instagram" src={instagram} />
        <div className="search-bar">
          <img alt="search" className="search-img" src={search} />
          <input className="search-input" placeholder="Search" />
        </div>
        <UploadForm />
        <div className="login-signup">
          @
          {user && user.displayName}
          <button onClick={handleLogout} id="sign-in" className="login">Log Out</button>
        </div>
      </header>
      <ImageGrid />
    </div>
  );
}

export default Dashboard;
