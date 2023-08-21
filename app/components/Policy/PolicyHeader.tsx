import { Link } from 'react-router-dom';

const PolicyHeader = () => {
  return (
    <>
      <Link to="/p/t">이용약관</Link> <Link to="/p/p">개인정보</Link>
    </>
  );
};

export default PolicyHeader;
