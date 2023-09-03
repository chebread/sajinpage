import getCurrentTime from 'lib/getCurrentTime';
import isExceedTime from 'lib/isExceedTime';
import stringToDate from 'lib/stringToDate';

// check file session is excess

const checkFileSessionByAccessTime = async (accessTime: any) => {
  const currentTime = getCurrentTime();
  const timeLimit = stringToDate(accessTime);
  const isSessionEnded = isExceedTime({
    currentTime: currentTime,
    endTime: timeLimit,
  });
  if (isSessionEnded) {
    // file is excessed
    return true;
  } else {
    return false;
  }
};

export default checkFileSessionByAccessTime;
