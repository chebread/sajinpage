import { clear } from 'idb-keyval';
import { onEventChannel } from 'lib/broadcastChannel';
import { toast } from 'react-hot-toast';

const onClearDb = () => {
  clear()
    .then(async () => {
      onEventChannel('clear');
      toast.success('Cleared');
    })
    .catch(() => {
      toast.error('Error during clear db');
    });
};

export default onClearDb;
