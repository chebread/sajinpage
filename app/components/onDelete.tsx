import { deleteFiles } from 'api';
import { toast } from 'react-hot-toast';

const onDelete = async (docId: string) => {
  await deleteFiles(docId)
    .then(() => {
      toast.success('파일 삭제됨');
    })
    .catch(() => {
      toast.error('파일 삭제중 오류 발생');
    });
};

export default onDelete;
