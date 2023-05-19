import loadFiles from './loadFiles';

const getFileUrl = async (docId: string) => {
  const db = await loadFiles(docId);
  const fileUrl = db.url; // https://jkbzservkrrjadofmhxj.supabase.co/storage/v1/object/public/images/225d2635035446629c8d74e9d5619176
  const dbStatus = await fetch(fileUrl).then(data => {
    // (0): fileUrl로 fetch 하면 오류 뜸
    return data.ok;
  });

  if (!dbStatus) {
    // status = 400
    throw new Response('접근한 파일은 세션이 만료된 파일입니다', {
      // 이럴경우 error messsge가 출력이 안됨
      // 내가 원하는 것은 status + message가 동시에 출력되어야 함
      status: 400,
    });
  }

  return fileUrl;
};

export default getFileUrl;
