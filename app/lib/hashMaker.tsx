import { v4 as uuidv4 } from 'uuid';

const hashMaker = () => {
  const hash = uuidv4().replace(/-/g, ''); // 길이는 임의로 자르면 안됨
  return hash;
};

export default hashMaker;
