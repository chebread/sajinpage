import { ReactComponent as SettingsIcon } from 'assets/svg/SettingsIcon.svg';
import { ReactComponent as HelpIcon } from 'assets/svg/HelpIcon.svg';
import { ReactComponent as PolicyIcon } from 'assets/svg/PolicyIcon.svg';
import transition from 'layouts/properties/transition';
import { desktopVp, disableTab } from 'layouts/properties';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DesktopBanner = () => {
  const params = useParams();
  const type = params.type;

  return (
    <Container>
      <Navigate
        className={type === 'a' || type === undefined ? 'active' : ''}
        to="/s"
      >
        <SettingsIcon />
        설정
      </Navigate>
      <Navigate className={type === 'f' ? 'active' : ''} to="/s/f">
        <HelpIcon />
        피드백 및 문의
      </Navigate>
      <Navigate className={type === 'p' ? 'active' : ''} to="/s/p">
        <PolicyIcon />
        서비스 정책
      </Navigate>
    </Container>
  );
};

const Container = styled.div`
  ${transition('all')}
  position: absolute;
  visibility: hidden;
  transform: translateX(-100%);
  height: 0;
  display: none;
  @media (${desktopVp}) {
    position: sticky;
    visibility: visible;
    transform: translateX(0);
    height: 100%;
    display: flex;
  }
  flex-direction: column;
  top: 4rem;
  padding: 2rem 1rem 1rem;
  min-width: 20rem;
`;
const Navigate = styled(Link)<{ $active?: boolean }>`
  all: unset;
  ${transition('all')}
  ${disableTab}
  cursor: pointer;
  height: 3.5rem;
  min-width: auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  &.active {
    background-color: #e6f0ff; // #e8f0fe // rgb(21, 88, 214)
    color: #1969d2;
    svg {
      fill: #1969d2;
    }
  }
  &:hover {
    color: #1969d2; // #1967d2
    /* transform: scale(1.02); */
    svg {
      fill: #1969d2;
    }
  }
  &:active {
    background-color: #d7e1f0; // #dee6f4
    transform: scale(0.98);
  }
  font-size: 1rem;
  color: #70757a;
  font-weight: 500;
  border-radius: 9999px;
  svg {
    ${transition('all')}
    height: 1.5rem;
    fill: #70757a;
  }
`;

export default DesktopBanner;
