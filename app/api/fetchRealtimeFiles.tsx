import supabase from 'components/supabase';

type fetchRealtimeFiles = {
  tableId: string;
  onUpdate: any;
  onDelete: any;
};

// types: update, insert, delete
const fetchRealtimeFiles = ({ tableId, onUpdate, onDelete }) => {
  const channel = supabase
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
    .subscribe();
};

export default fetchRealtimeFiles;
