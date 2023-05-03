import hashConstructor from 'lib/hashMaker';
import {
  db,
  setDoc,
  doc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'components/firebase';

const uploadFile = async ({ file }) => {
  const fileRefId = hashConstructor();
  const docRefId = hashConstructor();
  const fileRef = ref(storage, `images/${fileRefId}`);
  const docRef = doc(db, 'images', `${docRefId}`);
  const metadata = {
    contentType: null,
  };
  await uploadBytes(fileRef, file, metadata);
  await setDoc(docRef, {
    url: await getDownloadURL(fileRef),
    filename: fileRefId,
  });
  return docRefId;
};

export default uploadFile;
