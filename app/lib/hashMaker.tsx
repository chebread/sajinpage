import { v4 as uuidv4 } from 'uuid';

const hashMaker = () => {
  const hash = uuidv4().replace(/-/g, ''); // 범위는 동적임
  return hash;
};

export default hashMaker;
