import { clear, values } from 'idb-keyval';

const Settings = () => {
  const onClearDb = () => {
    clear()
      .then(async () => {
        console.log('cleared db', await values());
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
