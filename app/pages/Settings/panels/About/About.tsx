import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <h1>추가 리소스</h1>
      <Link to="/s/h">도움말</Link>
      <Link to="/s/p">서비스 정책</Link>
    </>
  );
};

export default About;
