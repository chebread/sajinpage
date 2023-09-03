import supabase from 'lib/supabase';

type uploadFilesProps = {
  file: File;
  limit: boolean;
  timeLimit: number;
  accessTime: string;
  fileId: string;
  docId: string;
  url: string;
  uploadType: string;
  fileType: string;
};

const uploadFiles = async ({
  file,
  docId,
  fileId,
  limit,
  timeLimit,
  accessTime,
  uploadType,
  url,
  fileType,
}: uploadFilesProps) => {
  // check bucket
  // create bucket
  if (uploadType === 'file') {
    // upload file
    const { data: uploadStorage, error: uploadStorageError } =
      await supabase.storage.from('images').upload(fileId, file, {
        cacheControl: '3600',
        upsert: false,
      });
    if (uploadStorageError) {
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
    const fileAccessUrl = limit ? fileUrl.signedUrl : fileUrl.publicUrl;
    // db
    const db = {
      // (규칙): 값을 공백으로 지정해야 할시는 ''로 저장함
      docId: docId,
      fileId: fileId,
      url: fileAccessUrl,
      accessTime: limit
        ? // 이미 acessTime은 string 타입임
          accessTime
        : '',
      limit: limit, // limit: true => limit upload mode / limit: false => normal upload mode
      excess: false,
      fileType: fileType,
      uploadType: uploadType,
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
  }
  if (uploadType === 'url') {
    // db
    const db = {
      docId: docId,
      fileId: '',
      url: url,
      accessTime: limit ? accessTime : '',
      limit: limit,
      excess: false,
      fileType: fileType,
      uploadType: uploadType,
    };

    const { data: uploadDb, error: uploadDbError } = await supabase
      .from('refs')
      .insert(db);
    if (uploadDbError) {
      throw new Error('file을 db에 업로드중 오류 발생');
    }
  }
};

export default uploadFiles;
