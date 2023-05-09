import supabase from 'components/supabase';
import hashConstructor from 'lib/hashMaker';

type uploadFilesProps = {
  file: any;
  limit: boolean;
  timeLimit: number; // limitTime은 limit: true 시에만 제공되고, 기본값이 아님, upload mode limit 설정시에는 limit 값에 sec로 된 숫자가 들어와야함
};

// (0): normal 모드에서 upload 오류 발생함 => null 에러
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
  // create file viewer url => mode에 따라 달라짐

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
    desc: '', // 사진에 관한 설명
    limit: limit, // limit: true => limit upload mode / limit: false => normal upload mode
    timeLimit: limit // (0): sTime 에 현재 시간, eTime에 종료 시간 (알람 같음)
      ? {
          sTime: timeLimit,
          eTime: timeLimit,
        }
      : '', // normal upload mode = '' / limit upload mode = sTime, eTime
  });
  if (uploadDb.error) {
    console.log(uploadDb.error);

    throw new Error('file을 db에 업로드중 오류 발생');
  }

  return docId;
};

export default uploadFiles;
