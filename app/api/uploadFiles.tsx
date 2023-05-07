import supabase from 'components/supabase';
import hashConstructor from 'lib/hashMaker';

const uploadFiles = async (file: any) => {
  const docId = hashConstructor();
  const fileId = hashConstructor();
  // check bucket
  // create bucket
  // upload file
  await supabase.storage.from('images').upload(fileId, file, {
    cacheControl: '3600',
    upsert: false,
  });
  // create file viewer url
  const fileUrl = supabase.storage.from('images').getPublicUrl(fileId);
  // create table
  // create columns
  // upload db
  await supabase
    .from('refs')
    .insert({ id: docId, url: fileUrl.data.publicUrl, fileId: fileId });
  return docId;
};

export default uploadFiles;
