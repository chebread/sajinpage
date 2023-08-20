import { get, set } from 'idb-keyval';
import { triggerEvent } from 'lib/broadcastChannel';

const addIdb = async (data: string) => {
  const urls = await get('urls');
  const notExistedUrls = urls === undefined;
  if (!notExistedUrls) {
    const newArr = [...urls, data];
    const isEqual = new Set(newArr).size === newArr.length ? true : false; // true: 중복값이 없음 false: 중복값 존재
    if (isEqual) {
      // idb에 중복된 값이 없음 => idb에 저장함
      await set('urls', [...urls, data]);
      triggerEvent('add');
    }
    // idb에 중복된 값이 있음 => idb에 저장하지 않음
  } else {
    // idb가 비어있음
    await set('urls', [data]);
    triggerEvent('add');
  }
};

export default addIdb;
