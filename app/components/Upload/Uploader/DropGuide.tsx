import { desktopVp, transition } from 'layouts/properties';
import styled from 'styled-components';
import { ReactComponent as PlusIcon } from 'assets/svg/PlusIcon.svg';

const DropGuide = ({ visible }) => {
  return (
    <Container visible={visible}>
      <IconWrapper>
        <PlusIcon />
      </IconWrapper>
      <Text>이미지를 여기에 놓으세요.</Text>
    </Container>
  );
};

const Text = styled.div`
  ${transition('all')}
  font-size: 1rem;
  font-weight: 500;
`;

const IconWrapper = styled.div`
  ${transition('all')}
  height: 5.5rem;
  width: 5.5rem;
  svg {
    ${transition('all')}
    height: 5.5rem;
    width: 5.5rem;
    fill: #000;
  }
  @media (${desktopVp}) {
    height: 7.5rem;
    width: 7.5rem;
    svg {
      height: 7.5rem;
      width: 7.5rem;
    }
  }
`;
const Container = styled.div<{ visible: boolean }>`
  ${transition('all')}
  position: fixed;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  z-index: ${({ visible }) =>
    visible ? '1000000' : '-1'}; // modalcontainer모다는 항시 커야함
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(1rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  @media (${desktopVp}) {
    gap: 2rem;
  }
`;

export default DropGuide;
