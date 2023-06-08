import getCurrentTime from 'lib/getCurrentTime';
import isExceedTimeLimit from 'lib/isExceedTimeLimit';
import stringToDate from 'lib/stringToDate';

const checkFileSession = async (db: any, f: any) => {
  const currentTime = getCurrentTime();
  const timeLimit = stringToDate(db.timeLimit);
  // limit mode일때
  const isSessionEnded = isExceedTimeLimit({
    currentTime: currentTime,
    endTime: timeLimit,
  });
  if (isSessionEnded) {
    // 세션 종료시
    await f();
  }
  // 세션이 유효함
};

export default checkFileSession;
