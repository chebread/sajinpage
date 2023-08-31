import copyText from 'lib/copyText';
import { toast } from 'react-hot-toast';

const onCopy = async (text: string) => {
  await copyText(text)
    .then(() => {
      toast('복사됨');
    })
    .catch(() => {
      toast.error('복사중 에러발생');
    });
};
export default onCopy;
