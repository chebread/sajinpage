import supabase from 'components/supabase';

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
