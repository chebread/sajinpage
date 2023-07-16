const idbStore = () => {
  var name = 'IndexedDB Name';
  var version = 1;
  var db = null;
  // IDBOpenDBRequest
  var request = indexedDB.open(name, version);
  var store = null;
  // 기존의 저장된 데이터베이스보다 큰 버전 번호의 데이터베이스가 로드 될 때 트리거된다.
  request.onupgradeneeded = function (event) {
    // IDBDatabase
    db = request.result;
    var name = 'store name';
    // IDBObjectStore
    store = db.createObjectStore(name);
  };
  return store;
};

export default idbStore;
