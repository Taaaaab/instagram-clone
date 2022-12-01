import React, {
  Children, useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { v4 } from 'uuid';
import instagram from '../images/instagram.png';
import search from '../images/search.svg';
import profileDefault from '../images/profile.png';
import HeartImage from './HeartImage';
import CommentImage from './CommentImage';
import ShareImage from './ShareImage';
import ShareImage2 from './ShareImage2';
import '../Dashboard.css';
import { UserAuth } from '../context/AuthContext';
import { auth, db, storage } from '../firebase-config';
import UploadForm from './UploadForm';

function Dashboard() {
  const { user, logout } = UserAuth();
  const commentRef = useRef();
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [error, setError] = useState('');
  const [isActive, setIsActive] = useState(false);
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
  //   getLikes();
  // }, []);

  // useEffect(() => {
  //   // console.log(comments);
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

  // function to refresh likes from firestore db
  function getLikes() {
    const photo1Likes = collection(db, 'bushbaby-likes');
    getDocs(photo1Likes)
      .then((response) => {
        const like = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setLikes(like);
      }).catch((error) => console.log(error.message));
  }

  async function heartClick(e) {
    setIsActive((current) => !current);
    try {
      if (isActive === false) {
        const likesRef = doc(db, 'bushbaby-likes', 'lk5wzow6BTZQgn1woRu0');

        await updateDoc(likesRef, {
          likes: increment(1),
        });
        getLikes();
      } else if (isActive === true) {
        const likesRef = doc(db, 'bushbaby-likes', 'lk5wzow6BTZQgn1woRu0');

        await updateDoc(likesRef, {
          likes: increment(-1),
        });
        getLikes();
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="container">
      <header className="nav-bar">
        <img className="instagram" alt="instagram" src={instagram} />
        <div className="Search-bar">
          <img alt="search" className="Search-img" src={search} />
          <input className="Search-input" placeholder="Search" />
        </div>
        <UploadForm />
        <div className="Login-signup">
          @
          {user && user.displayName}
          <button onClick={handleLogout} id="sign-in" className="Login">Log Out</button>
        </div>
      </header>
      <div className="Img-box">
        <div className="Img-top">
          <img id="user-pic" className="Profile-pic" alt="Profile-pic" src={profileDefault} />
          <div className="Name-box">
            <div className="Name">{user.displayName}</div>
            <div id="user-name" className="Username">
              @
              {user.displayName}
            </div>
          </div>
        </div>
        <div className="Img-content">
          <img className="Img-upload" alt="user pic" />
        </div>
        <div className="Img-icons">
          <div>
            <HeartImage onClick={heartClick} fill={isActive ? 'red' : 'none'} stroke={isActive ? 'none' : 'currentColor'} />
            <CommentImage onClick={saveMessage} />
            <ShareImage onClick={() => window.location = `mailto:${user.email}`} />
          </div>
          <div className="share2">
            <ShareImage2 onClick={() => window.location = `mailto:${user.email}`} />
          </div>
        </div>
        <div className="Img-comments">
          <div className="likes">
            {likes.map((like) => <div key={like.id}>{like.data.likes}</div>)}
              &nbsp;likes
          </div>
          <button onClick={() => getComments()} className="view-all">View All Comments</button>
          <ul className="comments">
            {comments.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.data.username}</strong>
                  &nbsp;
                {comment.data.text}
              </li>
            ))}
          </ul>
          <span className="line" />
          <form onSubmit={saveMessage}>
            <input className="Add-comment" ref={commentRef} type="text" placeholder="Add a comment..." />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
