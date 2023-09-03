import { desktopVp, disableTab, transition } from 'layouts/properties';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from 'assets/svg/AddIcon.svg';
import { ReactComponent as LinkIcon } from 'assets/svg/LinkIcon.svg';
import Modal from 'components/Modal';
import ModalCancelBtn from 'components/Modal/ModalCancelBtn';
import ModalHeader from 'components/Modal/ModalHeader';
import ModalWrapper from 'components/Modal/ModalWrapper';
import ModalCancelIcon from 'components/Modal/ModalCancelIcon';
import { ReactComponent as LeftArrowIcon } from 'assets/svg/LeftArrow.svg';
import { useState } from 'react';
import { linkUploaderClickedAtom } from 'atoms/uploaderAtom';
import { useAtom } from 'jotai';

const DesktopUploader = ({ open, onDropUrl }) => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useAtom(linkUploaderClickedAtom);

  const onBack = () => {
    navigate(-1);
    setClicked(false);
  };
  const onEnter = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onDropUrl(e.target.value);
    }
  };
  const toggleClicked = () => {
    setClicked(!clicked);
  };

  return (
    <Modal onBack={onBack}>
      <ModalHeader>
        {clicked ? (
          <ModalCancelBtn onClick={toggleClicked}>
            <LeftArrowIcon />
          </ModalCancelBtn>
        ) : (
          <ModalCancelBtn onClick={onBack}>
            <ModalCancelIcon />
          </ModalCancelBtn>
        )}
      </ModalHeader>
      <ModalWrapper>
        {clicked ? (
          <Input
            type="text"
            placeholder="복사한 파일 링크를 붙여넣어 주세요."
            onKeyUp={onEnter}
          />
        ) : (
          <>
            <Button onClick={open}>
              <AddIcon />
              파일 업로드
            </Button>
            <Button onClick={toggleClicked}>
              <LinkIcon />
              파일 링크 업로드
            </Button>
          </>
        )}
      </ModalWrapper>
    </Modal>
  );
};

const Input = styled.input`
  all: unset;
  ${disableTab}
  ${transition('all')}
  cursor: pointer;
  padding: 1.5rem 1.25rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: rgb(245, 245, 245);
  &::placeholder {
    color: #70757a;
  }
`;
const Button = styled.button`
  all: unset;
  ${disableTab}
  ${transition('all')}
  cursor: pointer;
  padding: 1.5rem 1.25rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: rgb(245, 245, 245);
  @media (${desktopVp}) {
    &:hover {
      /* background-color: rgb(235, 235, 235); */
    }
  }
  &:active {
    background-color: rgb(235, 235, 235);
    transform: scale(0.98);
  }
  svg {
    height: 1.5rem;
  }
`;

export default DesktopUploader;
