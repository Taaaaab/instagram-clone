import React, { useState } from 'react';
import {
  collection, doc, updateDoc, increment,
} from 'firebase/firestore';
import useFirestore from '../hooks/useFirestore';
import { db } from '../firebase-config';
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
              <CommentImage />
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
            <button className="view-all">View All Comments</button>
            <ul className="comments">
              {doc.comments}
            </ul>
            <span className="line" />
            <form>
              <input className="add-comment" type="text" placeholder="Add a comment..." />
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;
