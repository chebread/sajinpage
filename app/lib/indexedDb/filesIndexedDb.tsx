import { openDB } from 'idb';

const filesIndexedDb = async () => {
  const db = await openDB('files', 1, {
    upgrade(db) {
      db.createObjectStore('keyval');
    },
  });
  return db;
};

export default filesIndexedDb;
