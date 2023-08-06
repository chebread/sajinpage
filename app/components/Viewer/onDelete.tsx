import { deleteFiles } from 'api';
import { toast } from 'react-hot-toast';

const onDelete = async (docId: string) => {
  await deleteFiles(docId)
    .then(() => {
      toast.success('delete file');
    })
    .catch(() => {
      toast.error('파일 삭제중 오류 발생');
    });
};

export default onDelete;
