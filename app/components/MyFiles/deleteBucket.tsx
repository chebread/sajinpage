import { triggerEvent } from 'lib/broadcastChannel';
import { deleteIdb } from 'lib/idb';
import { toast } from 'react-hot-toast';

const onDeleteBucket = async (datas: any, value: any) => {
  await deleteIdb(datas, value)
    .then(() => {
      triggerEvent('CLEAR');
      toast('삭제됨');
    })
    .catch(() => {
      toast.error('삭제중 에러 발생');
    });
};

export default onDeleteBucket;
