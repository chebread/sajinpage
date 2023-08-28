import { deleteFiles } from 'api';
import { set } from 'idb-keyval';
import { triggerEvent } from 'lib/broadcastChannel';
import { deleteIdb } from 'lib/idb';

const deleteBucket = async (datas: any, value: any) => {
  await Promise.all([deleteFiles(datas), deleteIdb(datas, value)]);
  triggerEvent('DELETE_BUCKET');
};

export default deleteBucket;
