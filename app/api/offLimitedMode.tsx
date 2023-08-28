import { updateFiles } from 'api';
import supabase from 'lib/supabase';

const offLimitedMode = async ({ docId, fileId }) => {
  // turn on public mode
  const { data: fileUrl, error: fileUrlError }: any = supabase.storage
    .from('images')
    .getPublicUrl(fileId);
  const url = fileUrl.publicUrl;
  // update files
  await updateFiles({
    docId: docId,
    url: url,
    limit: false,
    accessTime: '',
  });
  return;
};

export default offLimitedMode;
