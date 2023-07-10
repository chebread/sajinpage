// 현재 시간에 제한 시간을 더합니다
// 시간은 날짜, 시간을 통칭함

type addTimeProps = {
  currentTime: any;
  sec: number;
};

const addTime = ({ currentTime, sec }: addTimeProps) => {
  const date = new Date(currentTime); // 현재 시간
  date.setSeconds(date.getSeconds() + sec); // 초를 더함
  return date; // 더해진 시간을 Date Object로 내보냄
};

export default addTime;
