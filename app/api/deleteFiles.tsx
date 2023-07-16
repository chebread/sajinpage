import supabase from 'lib/supabase';
import { loadFiles } from 'api';

const deleteFiles = async (docId: string) => {
  const db = await loadFiles(docId);
  const fileId = db.fileId;
  // remove file
  await supabase.storage.from('images').remove(fileId);
  // remove db
  await supabase.from('refs').delete().eq('docId', docId);
};

export default deleteFiles;
