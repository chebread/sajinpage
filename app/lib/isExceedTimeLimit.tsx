type isExceedTimeLimitProps = {
  startTime: any; // current time
  endTime: any;
};

const isExceedTimeLimit = ({ startTime, endTime }: isExceedTimeLimitProps) => {
  if (startTime >= endTime) {
    return true; // 초과함
  } else {
    return false; // 초과하지 않음
  }
};

export default isExceedTimeLimit;
