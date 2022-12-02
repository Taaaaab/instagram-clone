import React, { useRef, useState } from 'react';
import {
  collection, doc, updateDoc, increment, addDoc, serverTimestamp, setDoc, query, orderBy, getDocs, limit,
} from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import useFirestore from '../hooks/useFirestore';
import { auth, db } from '../firebase-config';
import { UserAuth } from '../context/AuthContext';
import profileDefault from '../images/profile.png';
import HeartImage from './HeartImage';
import CommentImage from './CommentImage';
import ShareImage from './ShareImage';
import ShareImage2 from './ShareImage2';

function ImageGrid() {
  const { docs } = useFirestore('images');
  console.log(docs);

  const { user } = UserAuth();
  const [isActive, setIsActive] = useState(false);
  const commentRef = useRef();
  const [comments, setComments] = useState([]);
  const [id, setId] = useState('');

  const handleLikes = (docId) => {
    setIsActive((current) => !current);

    const likesRef = doc(db, 'images', docId);

    if (isActive === false) {
      updateDoc(likesRef, {
        likes: increment(1),
      });
    } else if (isActive === true) {
      updateDoc(likesRef, {
        likes: increment(-1),
      });
    }
  };

  async function handleComments(e, docId) {
    e.preventDefault();
    setId(docId);
    const commentsRef = collection(db, docId);
    try {
      await addDoc(commentsRef, {
        username: auth.currentUser.displayName,
        comment: commentRef.current.value,
        timestamp: serverTimestamp(),
      });
      commentRef.current.value = ('');
    } catch (error) {
      console.log(error.message);
    }
  }

  function getComments() {
    const commentCollectionRef = collection(db, id);
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

  return (
    <div className="img-grid">
      { docs && docs.map((doc) => (
        <div className="img-box" key={doc.id}>
          <div className="img-top">
            <img id="user-pic" className="profile-pic" alt="Profile-pic" src={profileDefault} />
            <div className="name-box">
              <div className="name">{doc.userName}</div>
              <div id="user-name" className="username">
                @
                {doc.userName}
              </div>
            </div>
          </div>
          <div className="img-content">
            <img className="img-upload" src={doc.url} alt="user pic" />
          </div>
          <div className="img-icons">
            <div>
              <HeartImage onClick={() => handleLikes(doc.id)} fill={isActive ? 'red' : 'none'} stroke={isActive ? 'none' : 'currentColor'} />
              <CommentImage onClick={(e) => handleComments(e, doc.id)} />
              <ShareImage onClick={() => window.location = `mailto:${user.email}`} />
            </div>
            <div className="share2">
              <ShareImage2 onClick={() => window.location = `mailto:${user.email}`} />
            </div>
          </div>
          <div className="img-comments">
            <div className="likes">
              {doc.likes}
&nbsp;likes
            </div>
            <button type="button" className="view-all" onClick={getComments}>View All Comments</button>
            <ul className="comments">
              {comments.map((comment) => (
                <li key={comment.id}>
                  <strong>{comment.data.username}</strong>
                &nbsp;
                  {comment.data.comment}
                </li>
              ))}
            </ul>
            <span className="line" />
            <form onSubmit={(e) => handleComments(e, doc.id)}>
              <input
                className="add-comment"
                type="text"
                ref={commentRef}
                placeholder="Add a comment..."
              />
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;
