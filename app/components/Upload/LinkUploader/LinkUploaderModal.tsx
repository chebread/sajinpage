import styled from 'styled-components';
import { ReactComponent as CancelIcon } from 'assets/svg/CancelIcon.svg';
import {
  centerAlign,
  desktopVp,
  disableTab,
  transition,
} from 'layouts/properties';
import { useAtom } from 'jotai';
import { linkClickedAtom } from 'atoms/uploadAtom';

const LinkUploaderModal = () => {
  const [linkClicked, setLinkClicked] = useAtom(linkClickedAtom);

  const onCancel = () => {
    setLinkClicked(false);
  };

  return (
    <>
      <FloatModalsContainer visible={true}>
        <FloatModals>
          <CancelButton onClick={onCancel}>
            <CancelIcon />
          </CancelButton>
          <Wrapper>복사한 링크를 이 페이지에 붙여넣어 주세요.</Wrapper>
        </FloatModals>
        <FloatModalsBackground onClick={onCancel} />
      </FloatModalsContainer>
    </>
  );
};

const FloatModalsContainer = styled.div<{ visible?: boolean }>`
  ${transition('all')}
  visibility: hidden;
  opacity: 0;
  z-index: -1;
  @media (${desktopVp}) {
    visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    z-index: ${({ visible }) =>
      visible ? '1000000' : '-1'}; // modalcontainer모다는 항시 커야함
  }
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  ${centerAlign}
`;
const FloatModalsBackground = styled.div`
  display: block;
  ${transition('all')}
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
`;
const FloatModals = styled.div`
  position: fixed;
  height: 28rem;
  width: 600px;
  border-radius: 1rem;
  background-color: #ffffff;
  box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08);
`;
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  display: flex;
  ${centerAlign}
  z-index: -1;
  flex-direction: column;
`;

const CancelButton = styled.button`
  all: unset;
  margin: 0.5rem;
  ${disableTab}
  ${transition('all')}
  z-index: 10000;
  cursor: pointer;
  height: 3rem;
  width: 3rem;
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  &:hover {
    background-color: rgb(235, 235, 235);
    svg {
      /* transform: scale(1.07); */
    }
  }
  &:active {
    /* background-color: rgb(220, 220, 220); */
    transform: scale(0.93);
  }
  svg {
    ${transition('transform')}
    height: 1rem; // 1rem
    fill: #000000;
  }
`;

export default LinkUploaderModal;
