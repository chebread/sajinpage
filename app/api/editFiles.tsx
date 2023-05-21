import supabase from 'components/supabase';

const editFiles = async ({ docId, ...datas }) => {
  await supabase
    .from('refs')
    .update({ ...datas })
    .eq('docId', docId);
};

export default editFiles;
