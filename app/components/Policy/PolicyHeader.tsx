import { Link } from 'react-router-dom';

const PolicyHeader = () => {
  return (
    <>
      <h1>서비스 정책</h1>
      <Link to="/p/t">이용약관</Link> <Link to="/p/p">개인정보</Link>
    </>
  );
};

export default PolicyHeader;
