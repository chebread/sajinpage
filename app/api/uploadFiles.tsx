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
  const { data: uploadStorage, error: uploadStorageError } =
    await supabase.storage.from('images').upload(fileId, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: 'application/pdf',
    });

  if (uploadStorageError) {
    console.log(uploadStorageError);

    throw new Error('file을 storage에 업로드중 오류 발생');
  }
  // create file viewer url
  const { data: fileUrl, error: fileUrlError }: any = limit
    ? await supabase.storage.from('images').createSignedUrl(fileId, timeLimit)
    : supabase.storage.from('images').getPublicUrl(fileId);

  if (limit) {
    // signed url error checking
    if (fileUrlError) {
      // an error occurs
      throw new Error('file signed url 생성중 오류 발생');
    }
  } else {
    // public url error checking
    // 이거 할 필요가 없는게 getPublicUrl은 오류가 나지 않음
  }

  const url = limit ? fileUrl.signedUrl : fileUrl.publicUrl;

  // db
  const db = {
    // 값을 공백으로 지정해야 할시는 null로 저장함
    docId: docId,
    fileId: fileId,
    url: url,
    desc: '',
    limit: limit, // limit: true => limit upload mode / limit: false => normal upload mode
    // timeLimit은 저장할 필요가 없음 왜냐면 그냥 생성될때만 필요함
    excess: false,
  };
  // create table
  // create columns
  // upload db
  const { data: uploadDb, error: uploadDbError } = await supabase
    .from('refs')
    .insert(db);
  if (uploadDbError) {
    throw new Error('file을 db에 업로드중 오류 발생');
  }

  return docId;
};

export default uploadFiles;
