import copyText from 'lib/copyText';
import { toast } from 'react-hot-toast';

const onCopy = async (text: string) => {
  await copyText(text)
    .then(() => {
      toast('Copied');
    })
    .catch(() => {
      toast.error('Copy error');
    });
};
export default onCopy;
