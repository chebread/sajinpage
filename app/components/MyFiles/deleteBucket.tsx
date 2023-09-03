import { triggerEvent } from 'lib/broadcastChannel';
import { deleteIdb } from 'lib/idb';
import { toast } from 'react-hot-toast';

// 내부에서는 bucket이라는 말을 쓰되, 사용자에게는 파일이라고 칭함

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
