import { BottomScreen } from 'layouts/Screens';
import styled from 'styled-components';

type BottomButtonProps = {
  onClick?: any;
  children: any;
};

const BottomButton = ({ children, onClick }: BottomButtonProps) => {
  return (
    <BottomScreen>
      <Button onClick={onClick}>{children}</Button>
    </BottomScreen>
  );
};

const Button = styled.button`
  all: unset;
  // position
  position: fixed;
  z-index: 1;
  // alignment
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // font
  font-size: 20px;
  // size
  width: calc(100% - 60px);
  height: 75px;
  margin: 30px;
  border-radius: 30px;
  // background
  backdrop-filter: blur(18.75px);
  background-color: rgba(233, 236, 239, 65%);
  // animation
  transition: all;
  transition-duration: 0.15s;
  transition-timing-function: ease-out;
  // svg
  svg {
    height: 45px;
    width: 45px;
    fill: #000;
  }
  // hover
  &:hover {
    background-color: rgba(222, 226, 230, 65%);
  }
  &:active {
    background-color: rgba(206, 212, 218, 65%);
  }
  // tablet
  @media (min-width: 770px) {
    font-size: 22.5px;
    width: 70%;
  }
  // desktop
  @media (min-width: 1200px) {
    font-size: 25px;
    width: 50%;
  }
`;
export default BottomButton;
