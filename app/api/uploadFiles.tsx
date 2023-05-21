import supabase from 'components/supabase';
import hashConstructor from 'lib/hashMaker';

type uploadFilesProps = {
  file: any;
  limit: boolean;
  timeLimit: any;
};

// limit 로직이 여기 있음 여기서 바꾸자
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
  const fileUrl = limit
    ? (await supabase.storage.from('images').createSignedUrl(fileId, timeLimit))
        .data.signedUrl
    : supabase.storage.from('images').getPublicUrl(fileId).data.publicUrl;
  // create table
  // create columns
  // upload db
  const uploadDb = await supabase.from('refs').insert({
    docId: docId,
    url: fileUrl,
    fileId: fileId,
    desc: null, // 값이 지정되지 않으면 null로서 처리하기
    limit: limit, // limit: true => limit upload mode / limit: false => normal upload mode
    // (아직은 구현하지 않음)
    timeLimit: limit // (0): sTime 에 현재 시간, eTime에 종료 시간 (알람 같음)
      ? {
          sTime: timeLimit,
          eTime: timeLimit,
        }
      : null, // normal upload mode = '' / limit upload mode = sTime, eTime
  });
  if (uploadDb.error) {
    throw new Error('file을 db에 업로드중 오류 발생');
  }

  return docId;
};

export default uploadFiles;
