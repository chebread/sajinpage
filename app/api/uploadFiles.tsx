import supabase from 'lib/supabase';

type uploadFilesProps = {
  file: any;
  limit: boolean;
  timeLimit: any;
  accessTime: any;
  fileId: any;
  docId: any;
};

const uploadFiles = async ({
  docId,
  fileId,
  file,
  limit,
  timeLimit,
  accessTime,
}: uploadFilesProps) => {
  // check bucket
  // create bucket
  // upload file
  const { data: uploadStorage, error: uploadStorageError } =
    await supabase.storage.from('images').upload(fileId, file, {
      cacheControl: '3600',
      upsert: false,
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
    excess: false,
    accessTime: limit
      ? // 이미 acessTime은 string 타입임
        accessTime
      : '',
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
};

export default uploadFiles;
