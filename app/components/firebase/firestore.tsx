import initFirebase from './initFirebase';
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
// Initialize Firebase

// Initialize Cloud Storage and get a reference to the service
const db = getFirestore(initFirebase);

export { db, collection, getDoc, doc, setDoc, deleteDoc };
