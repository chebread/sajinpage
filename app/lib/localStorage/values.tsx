const values = () => {
  return new Promise(resolve => {
    resolve(Object.values(localStorage));
  });
};

export default values;
