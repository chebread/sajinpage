const triggerEvent = (message: string) => {
  new BroadcastChannel('channel').postMessage(message);
  // window.dispatchEvent(
  //   new CustomEvent('evented', {
  //     detail: {
  //       data: message,
  //     },
  //   })
  // );
};

export default triggerEvent;
