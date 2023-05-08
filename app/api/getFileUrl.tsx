import loadFiles from './loadFiles';

const getFileUrl = async (docId: string) => {
  const db = await loadFiles(docId);
  const fileUrl = db.url;
  return fileUrl;
};

export default getFileUrl;
