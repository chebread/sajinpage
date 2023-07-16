const get = (key: string) => {
  return new Promise(resolve => {
    resolve(JSON.parse(localStorage.getItem(key)));
  });
};

export default get;
