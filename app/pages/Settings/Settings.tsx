import { clear, values } from 'lib/localStorage';
import { onEventChannel } from 'lib/broadcastChannel';

const Settings = () => {
  const onClearDb = () => {
    clear()
      .then(async () => {
        console.log('cleared db', await values());
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

// try {
//   clear();
//   console.log('cleared', values());
// } catch (error) {
//   console.log(error); // toast
// }
