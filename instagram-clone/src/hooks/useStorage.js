import { useState, useEffect } from 'react';
import {
  ref, getDownloadURL, uploadBytesResumable,
} from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, storage, db } from '../firebase-config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = ref(storage, file.name);
    const collectionRef = collection(db, 'images');

    const uploadTask = uploadBytesResumable(storageRef, file);

    // storageRef.put(file).on('state_changed', (snap) => {
    uploadTask.on('state_changed', (snapshot) => {
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      setUrl(url);
      addDoc(collectionRef, {
        url,
        createdAt: serverTimestamp(),
        userName: auth.currentUser.displayName,
        likes: 0,
        comments: 0,
      });
    });
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
