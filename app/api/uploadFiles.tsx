import supabase from 'components/supabase';
import hashConstructor from 'lib/hashMaker';

const uploadFiles = async (file: any) => {
  // mode
  const docId = hashConstructor();
  const fileId = hashConstructor();
  // check bucket
  // create bucket
  // upload file
  const uploadStorage = await supabase.storage
    .from('images')
    .upload(fileId, file, {
      cacheControl: '3600',
      upsert: false,
    });
  if (uploadStorage.error) {
    throw new Error('file을 storage에 업로드중 오류 발생');
  }
  // create file viewer url
  const fileUrl = supabase.storage.from('images').getPublicUrl(fileId);
  // create table
  // create columns
  // upload db
  const uploadDb = await supabase.from('refs').insert({
    docId: docId,
    url: fileUrl.data.publicUrl,
    fileId: fileId,
    desc: '', // 사진에 관한 설명은 null로서 일단 초기화
    limit: false,
  });
  if (uploadDb.error) {
    throw new Error('file을 db에 업로드중 오류 발생');
  }

  return docId;
};

export default uploadFiles;
