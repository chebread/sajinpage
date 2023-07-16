import { clear, values } from 'idb-keyval';
import { onEventChannel } from 'lib/broadcastChannel';

const Settings = () => {
  const onClearDb = () => {
    clear()
      .then(async () => {
        onEventChannel('clear');
      })
      .catch(error => {
        console.log(error); // toast
      });
  };
  return (
    <div>
      <div>Settings</div>
      <button onClick={onClearDb}>Clear Db</button>
    </div>
  );
};

export default Settings;
