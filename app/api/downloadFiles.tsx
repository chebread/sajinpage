import supabase from 'lib/supabase';
import loadFiles from './loadFiles';

const downloadFiles = async (docId: string) => {
  // Fetch data
  const db = await loadFiles(docId);
  const fileId = db.fileId;
  const file = await supabase.storage.from('images').download(fileId);
  // Download files in browser by using JS
  const imageURL = URL.createObjectURL(file.data);
  const link = document.createElement('a');
  link.href = imageURL;
  link.download = docId; // 파일명은 docId 로함 (파일명은 따로 받지 않기에)
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadFiles;
