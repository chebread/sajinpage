import { set } from 'idb-keyval';
import { onEventChannel } from 'lib/broadcastChannel';
import { toast } from 'react-hot-toast';

const onDelete = async (datas: string[], value: string) => {
  const arr = [...datas];
  const newArr = arr.filter(element => element !== value);
  await set('urls', newArr);
  onEventChannel('delete');
  toast.success('Deleted');
};

export default onDelete;
