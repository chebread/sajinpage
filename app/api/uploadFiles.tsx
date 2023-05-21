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
  const fileUrl = supabase.storage.from('images').getPublicUrl(fileId)
    .data.publicUrl;
  // create table
  // create columns
  // upload db
  const uploadDb = await supabase.from('refs').insert({
    // 값을 공백으로 지정해야 할시는 null로 저장함
    docId: docId,
    url: fileUrl,
    fileId: fileId,
    desc: null,
    limit: limit, // limit: true => limit upload mode / limit: false => normal upload mode
    // timeLimit의 sql type은 Json인데 이는 js object type과 같은 역할을 수행한다
    timeLimit: limit
      ? {
          startTime: timeLimit.startTime.toString(), // string 타입으로 저장한후에 사용시에는 date 타입으로 바꿈
          endTime: timeLimit.endTime.toString(),
        }
      : null,
  });
  if (uploadDb.error) {
    throw new Error('file을 db에 업로드중 오류 발생');
  }

  return docId;
};

export default uploadFiles;
