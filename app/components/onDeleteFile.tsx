import { deleteFiles } from 'api';
import { toast } from 'react-hot-toast';

const onDeleteFile = async (docId: string) => {
  await deleteFiles(docId)
    .then(() => {
      toast('파일 삭제됨'); // 삭제를 진행한 곳에서만 나오게 됨. 다른 디바이스에션 나오지 않음
    })
    .catch(() => {
      toast.error('파일 삭제중 오류 발생');
    });
};

export default onDeleteFile;
