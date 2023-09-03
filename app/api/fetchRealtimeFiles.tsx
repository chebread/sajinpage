import clientChannels from './createClients';

type fetchRealtimeFiles = {
  tableId: string;
  onUpdate: any;
  onDelete: any;
};

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
    .on('broadcast', { event: 'DELETE' }, payload => {
      onDelete(payload);
    })
    .subscribe(status => {
      if (status === 'SUBSCRIBED') {
        // realtime subscribed 후에 viewer를 실행함
        onSubscribed();
      }
    });
  return realtimeChannel;
};

export default fetchRealtimeFiles;
