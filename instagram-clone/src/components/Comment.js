import { uuidv4 } from '@firebase/util';
import {
  arrayUnion, doc, onSnapshot, updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase-config';

export default function Comment({ id }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const commentRef = doc(db, 'images', id);

  useEffect(() => {
    const docRef = doc(db, 'images', id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, []);

  const handleChangeComment = (e) => {
    if (e.key === 'Enter') {
      updateDoc(commentRef, {
        comments: arrayUnion({
          userName: auth.currentUser.displayName,
          comment,
          createdAt: new Date(),
          commentId: uuidv4(),
        }),
      }).then(
        () => {
          setComment('');
        },
      );
    }
  };

  return (
    <div className="comments-container">
      <div className="comments">
        {
            comments !== null
            && comments.map(
              ({ commentId, comment, userName }) => (
                <div key={commentId}>
                  <strong><span>{userName}</span></strong>
                  &nbsp;
                  <span>{comment}</span>
                </div>
              ),
            )
        }
      </div>
      <button type="button" className="view-all">View All Comments</button>
      <span className="line" />
      <input
        className="add-comment"
        id="commentInput"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        onKeyUp={(e) => {
          handleChangeComment(e);
        }}
      />
    </div>
  );
}
