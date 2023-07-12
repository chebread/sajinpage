const getLocalDbValues = (tableName: string, key: number | string) => {
  const db = transaction.objectStore;
  const tx = db.transaction(tableName, 'readonly');
  const store = tx.objectStore(tableName);
  const result = await store.get(key);
  return result;
};

export default getLocalDbValues;
