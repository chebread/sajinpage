import { clear } from 'idb-keyval';
import { triggerEvent } from 'lib/broadcastChannel';
import { toast } from 'react-hot-toast';

const onClearDb = () => {
  clear()
    .then(async () => {
      triggerEvent('clear');
      toast.success('Cleared');
    })
    .catch(() => {
      toast.error('Error during clear db');
    });
};

export default onClearDb;
