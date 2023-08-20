import createClients from './createClients';

const triggerSupabaseEvent = ({ ...datas }) => {
  const channel = createClients().channel('realtime');
  channel.subscribe(status => {
    if (status === 'SUBSCRIBED') {
      channel.send({
        type: 'broadcast',
        event: 'DELETE',
        payload: {
          ...datas,
        },
      });
    }
  });
};

export default triggerSupabaseEvent;
