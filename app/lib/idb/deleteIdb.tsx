import { set } from 'idb-keyval';
import { onEventChannel } from 'lib/broadcastChannel';

const deleteIdb = async (datas: string[], value: string) => {
  const arr = [...datas];
  const newArr = arr.filter(element => element !== value);
  await set('urls', newArr);
  onEventChannel('clear');
};

export default deleteIdb;
