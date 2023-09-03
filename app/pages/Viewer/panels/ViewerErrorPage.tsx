import CorruptedFileUrl from './CorruptedFileUrl';
import EndedFileSession from './EndedFileSession';
import NotFoundFile from './NotFoundFile';

const ViewerErrorPage = ({ errorCode }) => {
  return (() => {
    switch (errorCode) {
      case 403:
        return <EndedFileSession />;
      case 404:
        return <NotFoundFile />;
      case 400:
        return <CorruptedFileUrl />;
      default:
        return null;
    }
  })();
};

export default ViewerErrorPage;
