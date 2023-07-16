const get = (key: string) => {
  return new Promise(resolve => {
    resolve(JSON.stringify(localStorage.getItem(key)));
  });
};

export default get;
