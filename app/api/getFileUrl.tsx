import loadFiles from './loadFiles';

const getFileUrl = async (id: string) => {
  const db = await loadFiles(id);
  const fileUrl = db.url;
  return fileUrl;
};

export default getFileUrl;
