import loadFiles from './loadFiles';
import { ref, storage } from 'components/firebase';

const getFileRef = async ({ fileId }) => {
  const fileDb = await loadFiles({ fileId });
  const filename = fileDb.filename;
  const fileRef = ref(storage, `images/${filename}`);
  return fileRef;
};

export default getFileRef;
