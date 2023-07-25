import CorruptedFileUrl from './CorruptedFileUrl';
import EndFileSession from './EndFileSession';
import NotFoundFile from './NotFoundFile';

const ViewerErrorPage = ({ errorCode }) => {
  return (() => {
    switch (errorCode) {
      case 403:
        return <EndFileSession />;
      case 404:
        return <NotFoundFile />;
      case 405: // (0): 이거 에러 code 수정하기
        return <CorruptedFileUrl />;
      default:
        return null;
    }
  })();
};

export default ViewerErrorPage;
