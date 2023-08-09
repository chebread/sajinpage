import { desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';

type BottomButtonProps = {
  onClick?: any;
  children: any;
};

const BottomButton = ({ children, onClick }: BottomButtonProps) => {
  return (
    <BtnWrapper>
      <Btn onClick={onClick}>{children}</Btn>
    </BtnWrapper>
  );
};

const BtnWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
const Btn = styled.button`
  all: unset;
  position: fixed;
  z-index: 10000000;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: calc(100% - 6rem);
  height: 4rem;
  border-radius: 2rem;
  ${transition('background-color', 'transform')}
  background-color: rgb(240, 240, 240);
  &:hover {
    background-color: rgb(235, 235, 235);
    transform: scale(1.07);
    svg {
      transform: scale(1.07);
    }
  }
  &:active {
    background-color: rgb(220, 220, 220);
    transform: scale(0.98);
    svg {
      transform: scale(0.98);
    }
  }
  svg {
    ${transition('transform')}
    height: 2rem;
  }
`;

export default BottomButton;
