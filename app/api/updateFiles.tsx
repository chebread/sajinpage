import supabase from 'lib/supabase';

// (0): updateFiles(docId, { fileType: xxx }) 의 형태로 사용할 수 있게 바꾸기

const updateFiles = async ({ docId, ...datas }) => {
  const { data, error } = await supabase
    .from('refs')
    .update({ ...datas })
    .eq('docId', docId);
  if (error) {
    throw new Error('file update 중 오류발생');
  }
};

export default updateFiles;
