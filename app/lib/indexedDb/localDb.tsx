import { openDB } from 'idb';

const localDb = async () => {
  const db = await openDB('localDb', 1, {
    upgrade(db) {
      const store = db.createObjectStore('filesDb', {
        keyPath: 'url',
        autoIncrement: true,
      });
    },
  });

  return db;
};

export default localDb;
