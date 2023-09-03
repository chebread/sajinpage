import { viewedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import {
  centerAlign,
  desktopVp,
  disableTab,
  transition,
} from 'layouts/properties';
import styled from 'styled-components';

type ModalProps = {
  onBack: any;
  children: any;
  visible?: boolean;
};

const Modal = ({ onBack, children, visible = true }: ModalProps) => {
  return (
    <FloatModalsContainer visible={visible}>
      <FloatModals>{children}</FloatModals>
      <FloatModalsBackground onClick={onBack} />
    </FloatModalsContainer>
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
    z-index: ${({ visible }) => (visible ? '1000000' : '-1')};
  }
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  ${centerAlign}
`;
const FloatModalsBackground = styled.div`
  visibility: hidden;
  opacity: 0;
  z-index: -1;
  @media (${desktopVp}) {
    visibility: visible;
    opacity: 1;
  }
  display: block;
  ${transition('all')}
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
const FloatModals = styled.div`
  position: fixed;
  height: auto;
  height: auto;
  width: 600px;
  border-radius: 1rem;
  background-color: #ffffff;
  box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08);
`;

export default Modal;
