import supabase from 'components/supabase';

type fetchRealtimeFiles = {
  tableId: string;
  onUpdate: any;
  onDelete: any;
};

// types: update, insert, delete
const fetchRealtimeFiles = ({ tableId, onUpdate, onDelete, onSubscribed }) => {
  const fetchChannel = supabase
    .channel('any')
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
      { event: 'DELETE', schema: 'public', table: tableId },
      payload => {
        onDelete(payload);
      }
    )
    .subscribe(status => {
      // realtime subscribed 후에 viewer를 실행함
      console.log(status);
      if (status === 'SUBSCRIBED') {
        onSubscribed();
      }
    });
  return fetchChannel;
};

export default fetchRealtimeFiles;
