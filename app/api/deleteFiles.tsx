import supabase from 'lib/supabase';
import { loadFiles } from 'api';
import createClients from './createClients';
import { onEventChannel } from 'lib/broadcastChannel';

const deleteFiles = async (docId: string) => {
  const fileDb = await loadFiles(docId);
  const fileId = fileDb.fileId;
  // remove file
  await supabase.storage.from('images').remove(fileId);
  // remove db
  await supabase.from('refs').delete().eq('docId', docId);
  // occur delete event
  // onEventChannel('DELETE');
  // occur delete event for realtime
  const channel = createClients().channel('broadcast');
  channel.subscribe(status => {
    if (status === 'SUBSCRIBED') {
      channel.send({
        type: 'broadcast',
        event: 'DELETE',
        payload: {
          docId: docId,
        },
      });
    }
  });
};

export default deleteFiles;
