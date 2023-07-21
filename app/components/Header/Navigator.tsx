// modal

import { centerAlign } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Navigator = ({ isVisible, onClickCancel }) => {
  console.log(isVisible);

  return (
    <Container isVisible={isVisible} onClick={onClickCancel}>
      <Wrapper>
        <NavigatesWrapper>
          <Navigates to="/">Upload</Navigates>
          <Navigates to="/f">My files</Navigates>
          <Navigates to="/s">Settings</Navigates>
        </NavigatesWrapper>
      </Wrapper>
    </Container>
  );
};

type NavigatorPropsType = {
  isVisible?: boolean;
};

const Container = styled.div<NavigatorPropsType>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10000;
  backdrop-filter: blur(0.5rem);
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  ${centerAlign}
`;
const NavigatesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Navigates = styled(NavLink)`
  all: unset;
  cursor: pointer;
  display: flex;
  ${centerAlign}
  ${transition('all')}
  &:hover {
    color: gray;
  }
  &:active {
    color: dimgray;
  }
  margin-bottom: 1rem;
  font-size: 3rem;
  font-weight: 800;
  height: 5rem;
  padding: 1rem;
  background-color: #ffffff;
  border: 1px solid black;
  border-radius: 2rem;
`;

export default Navigator;
