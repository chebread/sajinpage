import EndFileSession from './EndFileSession';
import NotFoundFile from './NotFoundFile';

const ViewerErrorPage = ({ errorCode }) => {
  return (() => {
    switch (errorCode) {
      case 404:
        return <NotFoundFile />;
      case 403:
        return <EndFileSession />;
      default:
        return null;
    }
  })();
};

export default ViewerErrorPage;
