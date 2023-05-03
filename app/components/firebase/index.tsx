import { db, collection, getDoc, doc, setDoc, deleteDoc } from './firestore';
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from './storage';

export {
  db,
  collection,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
};
