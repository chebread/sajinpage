import supabase from 'lib/supabase';
import { loadFiles } from 'api';
import createClients from './createClients';

const deleteFiles = async (docId: string) => {
  const channel = createClients().channel('broadcast');
  channel.subscribe(status => {
    if (status === 'SUBSCRIBED') {
      // occur delete event
      channel.send({
        type: 'broadcast',
        event: 'DELETE',
        payload: {
          docId: docId,
        },
      });
    }
  });
  const fileDb = await loadFiles(docId);
  const fileId = fileDb.fileId;
  // remove file
  await supabase.storage.from('images').remove(fileId);
  // remove db
  await supabase.from('refs').delete().eq('docId', docId);
};

export default deleteFiles;
