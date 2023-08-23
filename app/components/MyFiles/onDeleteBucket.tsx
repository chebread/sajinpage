import { deleteIdb } from 'lib/idb';
import { toast } from 'react-hot-toast';

const onDeleteBucket = (datas: any, value: any) => {
  deleteIdb(datas, value)
    .then(() => {
      toast('Deleted');
    })
    .catch(() => {
      toast.error('Not deleted');
    });
};

export default onDeleteBucket;
