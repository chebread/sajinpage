import { downloadFiles } from 'api';

const onDownload = async (docId: string) => {
  await downloadFiles(docId).catch(() => {
    alert('파일 다운로드중 오류 발생');
  });
};

export default onDownload;
