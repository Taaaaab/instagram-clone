import { useState, useEffect } from 'react';
import {
  collection, query, updateDoc, onSnapshot, orderBy, increment, doc,
} from 'firebase/firestore';
import { db } from '../firebase-config';

const useFirestore = (col) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const colRef = collection(db, col);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    return () => unsubscribe();
  }, [collection]);

  return { docs };
};

export default useFirestore;
