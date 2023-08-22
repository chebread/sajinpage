import { set } from 'idb-keyval';
import { triggerEvent } from 'lib/broadcastChannel';

const deleteIdb = async (datas: string[], value: string) => {
  const arr = [...datas];
  const newArr = arr.filter(element => element !== value);
  await set('urls', newArr);
  triggerEvent('CLEAR');
};

export default deleteIdb;
