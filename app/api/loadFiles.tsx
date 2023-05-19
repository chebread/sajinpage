import supabase from 'components/supabase';

const loadFiles = async (docId: any) => {
  const dbRow = await supabase.from('refs').select().eq('docId', docId); // (0): 성능확인필요
  const db = dbRow.data[0];
  if (db === undefined) {
    throw new Error('404'); // 존재하지 않는 파일입니다
  }
  return db;
};

export default loadFiles;
