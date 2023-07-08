import supabase from 'components/supabase';

const updateFilesDesc = async ({ docId, content }) => {
  const { data, error } = await supabase
    .from('refs')
    .update({ desc: content })
    .eq('id', docId);
  if (error) {
    throw new Error('file desc update 중 오류발생');
  }
};

export default updateFilesDesc;
