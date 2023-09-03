import supabase from 'lib/supabase';
import { loadFiles } from 'api';
import { triggerEvent } from 'lib/broadcastChannel';
import triggerSupabaseEvent from './triggerSupabaseEvent';

const deleteFiles = async (docId: string) => {
  const fileDb = await loadFiles(docId);
  const fileId = [fileDb.fileId];
  const uploadType = fileDb.uploadType;
  if (uploadType === 'file') {
    // remove file
    const { data: storage, error: storageError }: any = await supabase.storage
      .from('images')
      .remove(fileId);
    if (storage.length === 0) {
      // (0): storageError 작동하지 않는 이유
      throw new Error('file을 storage에 삭제중 오류발생');
    }
  }
  // remove db
  const { data: db, error: dbError }: any = await supabase
    .from('refs')
    .delete()
    .eq('docId', docId);
  if (dbError) {
    throw new Error('file을 db에서 삭제중 오류발생');
  }
  // occur delete event
  triggerEvent(`DELETE ${docId}`);
  // occur delete event for realtime
  triggerSupabaseEvent({
    docId: docId,
  });
};

export default deleteFiles;
