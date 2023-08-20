import clientChannels from './createClients';

type fetchRealtimeFiles = {
  tableId: string;
  onUpdate: any;
  onDelete: any;
};

// types: update, insert, delete
const fetchRealtimeFiles = ({ tableId, onUpdate, onDelete, onSubscribed }) => {
  const realtimeChannel = clientChannels()
    .channel('realtime')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: tableId,
      },
      payload => {
        onUpdate(payload);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: tableId,
      },
      payload => {
        console.log(payload);
      }
    )
    .subscribe(status => {
      // realtime subscribed 후에 viewer를 실행함
      console.log(status);
      if (status === 'SUBSCRIBED') {
      }
    });
  const broadcastChannel = clientChannels()
    .channel('broadcast')
    .on('broadcast', { event: 'DELETE' }, payload => {
      onDelete(payload);
    })
    .subscribe(status => {
      console.log(status);
      if (status === 'SUBSCRIBED') {
        onSubscribed();
      }
    });
  return { realtimeChannel, broadcastChannel };
};

export default fetchRealtimeFiles;
