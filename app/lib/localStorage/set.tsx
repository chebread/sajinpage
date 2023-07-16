const set = (key: string, value: any) => {
  return new Promise<void>(resolve => {
    localStorage.setItem(key, JSON.stringify(value));
    resolve();
  });
};

export default set;

// const set = async (key: string, value: string) => {
//   return Promise.resolve().then(() => {
//     localStorage.setItem(key, value);
//   });
// };

// export default set;
