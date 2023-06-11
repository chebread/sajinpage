import supabase from 'components/supabase';
import hashConstructor from 'lib/hashMaker';

type uploadFilesProps = {
  file: any;
  limit: boolean;
  timeLimit: any;
};

const uploadFiles = async ({ file, limit, timeLimit }: uploadFilesProps) => {
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
  const fileUrl: any = limit
    ? await supabase.storage.from('images').createSignedUrl(fileId, timeLimit)
    : supabase.storage.from('images').getPublicUrl(fileId);
  if (limit && fileUrl.error) {
    // signed url error checking
    throw new Error('file signed url 생성중 오류 발생');
  }
  // (0): public url 에러 체크하기
  const url = limit ? fileUrl.data.signedUrl : fileUrl.data.publicUrl;
  console.log(url);
  // db
  const db = {
    // 값을 공백으로 지정해야 할시는 null로 저장함
    docId: docId,
    url: url,
    fileId: fileId,
    desc: '',
    limit: limit, // limit: true => limit upload mode / limit: false => normal upload mode
    // timeLimit의 sql type은 Json인데 이는 js object type과 같은 역할을 수행한다
  };
  console.log(db);

  // create table
  // create columns
  // upload db
  const uploadDb = await supabase.from('refs').insert(db);
  console.log(uploadDb);

  if (uploadDb.error) {
    throw new Error('file을 db에 업로드중 오류 발생');
  }

  return docId;
};

export default uploadFiles;
