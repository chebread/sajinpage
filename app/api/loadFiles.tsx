import supabase from 'lib/supabase';

// (0): 실시간으로 데이터 fetching 하기
const loadFiles = async (docId: any) => {
  const dbRow = await supabase.from('refs').select().eq('docId', docId);
  const db: any = dbRow.data[0];
  if (db === undefined) {
    throw new Error('존재하지 않는 파일입니다');
  }
  return db;
};

export default loadFiles;
