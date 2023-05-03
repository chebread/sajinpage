import { db, doc, getDoc } from 'components/firebase';

const loadFiles = async ({ fileId }) => {
  const docRef = doc(db, 'images', fileId);
  const docData = await getDoc(docRef);
  if (docData.exists()) {
    const data = docData.data();
    return data;
  } else {
    return null;
  }
};

export default loadFiles;
