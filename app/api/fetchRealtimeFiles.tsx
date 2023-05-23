import supabase from 'components/supabase';

const fetchRealtimeFiles = (tableId: string, f: any) => {
  const channel = supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
      },
      payload => {
        if (payload.table === tableId) {
          f(payload);
        }
      }
    )
    .subscribe();
};

export default fetchRealtimeFiles;
