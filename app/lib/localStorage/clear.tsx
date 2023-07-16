const clear = () => {
  return new Promise<void>(resolve => {
    localStorage.clear();
    resolve();
  });
};

export default clear;
