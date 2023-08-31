import { updateFiles } from 'api';
import addTime from 'lib/addTime';
import dateToString from 'lib/dateToString';
import getCurrentTime from 'lib/getCurrentTime';
import supabase from 'lib/supabase';

const onLimitedMode = async ({ timeLimit, docId, fileId, uploadType }) => {
  // update accessTime
  const currentTime = getCurrentTime();
  const accessTime = dateToString(
    addTime({ currentTime: currentTime, sec: timeLimit })
  );
  if (uploadType === 'file') {
    // update limit url
    const { data: fileUrl, error: fileUrlError }: any = await supabase.storage
      .from('images')
      .createSignedUrl(fileId, timeLimit);
    // signed url error checking
    if (fileUrlError) {
      // an error occurs
      throw new Error('file signed url 생성중 오류 발생');
    }
    const url = fileUrl.signedUrl;
    // update file
    await updateFiles({
      docId: docId,
      url: url,
      limit: true,
      accessTime: accessTime,
    });
  }
  if (uploadType === 'url') {
    // update file
    await updateFiles({
      docId: docId,
      limit: true,
      accessTime: accessTime,
    });
  }
  return;
};

export default onLimitedMode;
