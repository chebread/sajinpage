import { Link } from 'react-router-dom';

const PolicyHeader = () => {
  return (
    <>
      <h1>서비스 정책</h1>
      <Link to="/p/terms">이용약관</Link> <Link to="/p/privacy">개인정보</Link>
    </>
  );
};

export default PolicyHeader;
