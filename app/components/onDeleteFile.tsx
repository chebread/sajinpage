import { deleteFiles } from 'api';
import { toast } from 'react-hot-toast';

const onDeleteFile = async (docId: string) => {
  await deleteFiles(docId)
    .then(() => {
      toast('파일 삭제됨');
    })
    .catch(() => {
      toast.error('파일 삭제중 오류 발생');
    });
};

export default onDeleteFile;
