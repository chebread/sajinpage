type isExceedTimeLimitProps = {
  currentTime: Date; // current time
  endTime: Date;
};

const isExceedTime = ({ currentTime, endTime }: isExceedTimeLimitProps) => {
  const diff = currentTime.getTime() - endTime.getTime(); // 음수면 남은 초 (세션이 살아 있음) or 양수면 초과된 초가 도출됨 (세션이 종료됨)
  if (diff >= 0) {
    // 세션이 종료됨
    return true;
  } else {
    // 세션이 아직 살아 있음
    return false;
  }
};

export default isExceedTime;
