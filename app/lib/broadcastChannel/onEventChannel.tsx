import channel from './eventChannel';

const onEventChannel = (message: string) => {
  channel.postMessage(message);
  window.dispatchEvent(
    new CustomEvent('evented', {
      detail: {
        data: message,
      },
    })
  );
};

export default onEventChannel;
