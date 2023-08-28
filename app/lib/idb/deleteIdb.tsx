import { set } from 'idb-keyval';

const deleteIdb = async (datas: string[], value: string) => {
  const arr = [...datas];
  const newArr = arr.filter(element => element !== value);
  await set('urls', newArr);
};

export default deleteIdb;
