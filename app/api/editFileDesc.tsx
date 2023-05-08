import supabase from 'components/supabase';

const editFilesDesc = async ({ docId, content }) => {
  await supabase.from('refs').update({ desc: content }).eq('id', docId);
};

export default editFilesDesc;
