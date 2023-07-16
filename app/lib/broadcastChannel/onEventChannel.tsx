import channel from './eventChannel';

const onEventChannel = (message: string) => {
  channel.postMessage(message);
};

export default onEventChannel;
