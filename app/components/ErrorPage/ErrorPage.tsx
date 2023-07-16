import { CenterAlign, DisabledSelection } from 'layouts/properties';
import { CenterScreen } from 'layouts/screens';
import styled from 'styled-components';

const ErrorPage = ({ errorCode, errorMessage, onClick }) => {
  return (
    <div>
      <div>{errorCode}</div>
      <div>{errorMessage}</div>
    </div>
  );
};

const Screen = styled(CenterScreen)`
  ${DisabledSelection}
`;

const Notice = styled.button`
  all: unset;
  font-size: 50px;
  display: flex;
  ${CenterAlign}
  // animation
  transition: box-shadow, margin, font-size;
  transition-duration: 0.25s;
  transition-timing-function: ease-out;
  // tablet
  @media (min-width: 770px) {
    font-size: 75px;
  }
  // desktop
  @media (min-width: 1200px) {
    font-size: 100px;
  }
`;

export default ErrorPage;
