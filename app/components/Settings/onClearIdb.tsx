import { clear } from 'idb-keyval';
import { triggerEvent } from 'lib/broadcastChannel';
import { toast } from 'react-hot-toast';

const onClearIdb = () => {
  clear()
    .then(async () => {
      triggerEvent('CLEAR');
      toast('Cleared');
    })
    .catch(() => {
      toast.error('Error during clear db');
    });
};

export default onClearIdb;
